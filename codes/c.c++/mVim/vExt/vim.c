#include "v.h"

char buffer_read[127]={}, *pChar;

sig_t* createSig(const char *ss,unsigned int v, unsigned int atype, const char *msg){
  sig_t *s = s_malloc(sig_t);

  int i;
  for(i=0; i < strlen(ss); i++)
    s->sig[i] = ss[i];

  (s)->version[0]  = v; // This might be broken during the creation
  (s)->str_len[0]  = 0x40 + strlen(msg); // Are we missing spot for \0 ?
  (s)->alg_type[0] = atype;

  // buffer_size - strlen(msg)

  // Counter for secret msg length
  for(i=0; i < strlen(msg); i++) (s)->m[i] = msg[i];
    for(i=0; i < (BUFFER_SIZE - strlen(msg)); i++)
      (s)->m[i+strlen(msg)] = cRand();
  for(i=0; i < BUFFER_SIZE; i++)
    (s)->j[i] = cRand(); // let it fill the whole buffer

  return s;
}
void extract(int start, int end, const char *src, char *dst ){
  int i = 0;
  for(; i < end; i++, start++)
    *(dst + i) = *(src + start);
  *(dst + i) = '\0';
}
char cRand(){
  srand (time(NULL));
  char r = rand() % 0x7E + 0x21; // Offset
  return r;
}
char *encrypt(const char *str){

  char *s = malloc(strlen(str));
  strcpy(s, str);

  int i = 0;
  while(i < strlen(str))
  {
    s[i] ^= 0xF;
    i++;
  }

  return s;
}
fvim_t * v_open(const char *fname){
  pp([%c] opening file... \n,'?');

  // Opening for reading
  if( access( fname, F_OK ) == -1 ) {
    pp([%c] File dont exist... \n,'!');
    return NULL;
  }

  fvim_t *pfvim = s_malloc(fvim_t);       // Allocate
  memset(pfvim,0, sizeof(fvim_t));
  strcpy(pfvim->fname, fname);
  pfvim->fp = fopen(pfvim->fname, "rb");  // Open file and save it
  pfvim->s = s_malloc(sig_t);
  memset(pfvim->s, 0,sizeof(sig_t));

  fseek(pfvim->fp, 0, SEEK_SET);          // Read FILE
  pChar = buffer_read;
  char c;
  while((c=fgetc(pfvim->fp)) != EOF)
  {
    if(c=='\0')continue; // Save into buffer so we can process it
    *pChar++ = c;
  }

  extract(0,3, buffer_read, pfvim->s->sig);
  extract(3,1, buffer_read, pfvim->s->version);
  extract(4,1, buffer_read, pfvim->s->str_len);
  extract(5,1, buffer_read, pfvim->s->alg_type);
  extract(6,((int)*pfvim->s->str_len - 0x40), buffer_read, pfvim->s->m);

  pp(file opened %d \n,1);
  return pfvim;
}
fvim_t * v_create(const char *fname, const char *msg){

  pp([%c] creating file\n,'?');

  // Opening for reading
  if( access( fname, F_OK ) != -1 ) {
    pp([%c] File exist delete it... \n,'!');
    return NULL;
  }
  // Check buffer size not big

  fvim_t *pfvim = s_malloc(fvim_t);
  memset(pfvim,0, sizeof(fvim_t));
  strcpy(pfvim->fname, fname);
  pfvim->fp = fopen(pfvim->fname, "wb");

  pfvim->s = (sig_t *)createSig("VIM", 0x41, 0x42, encrypt(msg)); // Delete the 4
  fwrite(pfvim->s, sizeof(char), sizeof(sig_t)/sizeof(char), pfvim->fp);
  pp(pfvim file created %s\n, pfvim->fname);

  return pfvim;
}
void v_info(fvim_t *pfvim){
  // Read sig and other things
  pp([%c] getting file info...\n,'?');

  printf("sig       [%s]\n", pfvim->s->sig);
  printf("version   [%d]\n", ((int)*pfvim->s->version-0x40));
  printf("alg type  [%d]\n", ((int)*pfvim->s->alg_type-0x40));
  printf("length    [%d]\n", ((int)*pfvim->s->str_len-0x40));
}
void v_read(fvim_t *pfvim){
  pp([%c] reading secret msg from temp local buffer...\n,'?');


  // Open file in write mode
  int i = 0;
  while(i < (int)*pfvim->s->str_len-0x40) // This might be wrong
  {
    pfvim->s->m[i] ^= 0xF;
    printf("%c", (char)pfvim->s->m[i]);
    i++;
  }
  printf("\n");
  pp(done[%d]\n,1);
}
void v_write(fvim_t *pfvim, const char *msg){
  pp([%c] writing secret msg...,'?');

  // Write everything from buffer into file?
  //  What if its new file with no msg in it?
  //  vs
  //  File with old msg in it, overwrite?

  printf("\nmessage         [%s]\n", pfvim->s->m);
  printf("\nmessage length  [%d]\n", (int)*pfvim->s->str_len-0x40);

  pp(done[%d]\n,1);
}
void v_close(fvim_t *pfvim){
  pp([%c] closing file...,'?');
  fclose(pfvim->fp);
  free(pfvim->s);
  free(pfvim);
  pp(done[%d]\n,1);
}
