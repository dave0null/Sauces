	    //**************************************
    //INCLUDE files for :crypt.c
    //**************************************
    #include <stdio.h>
    #include <sys/types.h>
    #include <sys/stat.h>
    #include <fcntl.h>
    //**************************************
    // Name: CryptCode.c
    // Description:Encrypts file and outputs it to a file or stdout
    // By:Praveena M
    //
    //
    // Inputs:CryptCode.exe <infile> <outfile> <key>
    //
    //**************************************
   
    #define cypherbits 256 /* encryption strength in bits */
    #define cypher cypherbits/(sizeof(int)*8)
    int seed[cypher];
    void modseed() {
    int x;
    for(x=1;x<cypher;x++)seed[x]=seed[x]*0x81772012+seed[x]+0x49122035+seed[x+1];
    for(x=1;x<cypher;x++)seed[0]=seed[0]^seed[x];
    }
    int seedsum() {
    int n,x;
    n=0x80379251;
    for(x=0;x<cypher;x++)n=n^seed[x];
    return((n>>24)^((n>>16)&255)^((n>>8)&255)^(n&255));
    }
    char strequ(char *s1,char *s2) {
    int p;
    p=0;
    while((s1[p]==s2[p])&&(s1[p]!=0)&&(s2[p]!=0))p++;
    if(s1[p]==s2[p])return(1); else return(0);
    }
    int main(int argc,char *argv[]) {
    char 
banner[]="\x43\x6f\x64\x65\x64\x20\x62\x79\x20\x50\x72\x61\x76\x65\x65\x6e\x61"
    "\x20\x6f\x66\x20\x49\x6e\x64\x69\x61"
    
"\x20\x28\x70\x76\x6e\x63\x61\x64\x40\x6b\x72\x65\x63\x2e\x65\x72\x6e\x65\x74\x2e\x69\x6e\x29";
    char buf[2048];
    int p,r,l,i,t,s,x;
    char b,c,pct,lpct;
    FILE *infile=NULL,*outfile=NULL;
    fprintf(stderr, "%s\n", banner);
    if(argc!=4){
    fprintf(stderr,"use: %s <infile> <outfile> <key>\n",argv[0]);
    return -1;
    }
    if(strequ(argv[1],"stdin"))infile=stdin; else
    if((infile=fopen(argv[1],"r"))==NULL){
    fprintf(stderr,"failed to open %s\n",argv[1]);
    return -1;
    }
    if(strequ(argv[2],"stdout"))outfile=stdout; else
    if((outfile=fopen(argv[2],"w"))==NULL){
    fprintf(stderr,"failed to create %s\n",argv[2]);
    return -1;
    }
    if(infile!=stdin) {
    fseek(infile,0,SEEK_END);
    l=ftell(infile);
    rewind(infile);
    } else l=0;
    s=l;
    t=0;
    pct=0;
    if(l<1)fprintf(stderr,"Encrypting data.. (%d bit cypher)\n",cypher*sizeof(int)*8);
    else fprintf(stderr,"Encrypting %d bytes.. (%d bit cypher)\n",l,cypher*sizeof(int)*8);
  /*  bzero(seed,sizeof(seed)); */
    modseed();
    p=0;
    while(argv[3][p]!=0){
    modseed();
    seed[0]=seed[0]+argv[3][p];
    modseed();
    p++;
    }
    i=0;
    if(l>0){
    fputc('[',stderr);
    x=(l/sizeof(buf));
    if(l-x*sizeof(buf)!=0)x+=1;
    if(x>38)x=38;
    for(p=0;p<x;p++) fputc(32,stderr);
    fputc(']',stderr);
    fputc(13,stderr);
    fputc('[',stderr);
    fflush(stderr);
    }
    c=1;
    while(c){
    r=fread(&buf,1,sizeof(buf),infile);
    if(r>0) {
         t+=r;
         if(l>0){
        lpct=pct;
        pct=t/(l/x);
        if(pct>lpct) {
        fputc(88+32*i,stderr);  
        fflush(stderr);
        i=1-i;
        }
         } else {
        fputc(88+32*i,stderr);
        fflush(stderr);
        i=1-i;
         }
         p=0;
         while(p<r) {
        modseed();
        buf[p]=buf[p]^seedsum();
        p++;
         }
         if(fwrite(&buf,1,r,outfile)!=r) {
        fprintf(stderr,"\nerror writing data\n");
        return -1;
         }
    } else c=0;
    }
    if(l>0)fputc(']',stderr);
    fprintf(stderr,"\nDone. Wrote %d bytes.\n",t);
    }
