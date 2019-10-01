#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define BUFFER_SIZE 64
#define LOOP_FOR_BUFFER() for(int i = 0; i < BUFFER_SIZE; i++)

typedef const char CC;
typedef struct Dictionary_element{
  char c;
  unsigned short count;
} Dict;

Dict *ptr[BUFFER_SIZE];
Dict **p;

int isInDict(CC c){
    LOOP_FOR_BUFFER()
    if(ptr[i] && ptr[i]->c == c) return ptr[i]->count++;
  return 0;
}

#define LOOP_PRINT_C()\
  LOOP_FOR_BUFFER()\
  if(ptr[i]) printf("[%c]\t", ptr[i]->c);\
  printf("\n");

#define LOOP_PRINT_CHAR()\
  LOOP_FOR_BUFFER()\
  if(ptr[i]) printf("[%d]\t", ptr[i]->count);\
  printf("\n");

void createDict(CC *str)
{
  printf("\tCreating dictonary for: %s\n", str);
  for(p = ptr;*str != '\0';*str++)
    if(!isInDict(*str)) {
      (*p = (Dict *)malloc(sizeof(Dict)))->c = *str;
      (*p++)->count = 1;
    }
  LOOP_PRINT_C()
  LOOP_PRINT_CHAR()
}

int main(void)
{
  createDict("Hello world");
  return 0;
}
// END
