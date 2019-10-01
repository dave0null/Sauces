#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/*
  https://en.wikipedia.org/wiki/CHIP-8

   NNN: address
   NN: 8-bit constant
   N: 4-bit constant
   X and Y: 4-bit register identifier
   PC : Program Counter
   I : 16bit register (For memory address) (Similar to void pointer)

   6XNN   Const   Vx = NN   Sets VX to NN.

   LNNN   ADDRESS

  Assembly language for C? its like transfer assembly to C source? lol
*/

struct loop{
  /*Statement*/
  // Loop the stirng 5 times
  /*loop <number>, <string>*/
  int count;
  char *str;
  int strLen;
};

struct mov{
  /*
   The source operand can be an immediate value, general-purpose register,
   segment register, or memory location; the destination register can be a general-purpose
   register, segment register, or memory location. Both operands must be the same size,
   which can be a byte, a word, or a doubleword.
  */
  /*Assign*/
  // Store the number of loops into R
  /*mov r*/
  char *str;
  int strLen;
};

struct ifX{
  /*Cond*/
  // if X was repeated X times, print string?
  /*ifX <times repeated? >, <string>*/
  char *str;
  int strLen;
};

void parseInst(const char *msg)
{
  // Explode strings to array (zero or more space) (optional)

}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

char** str_split(char* a_str, const char a_delim)
{
    char** result    = 0;
    size_t count     = 0;
    char* tmp        = a_str;
    char* last_comma = 0;
    char delim[2];
    delim[0] = a_delim;
    delim[1] = 0;

    /* Count how many elements will be extracted. */
    while (*tmp)
    {
        if (a_delim == *tmp)
        {
            count++;
            last_comma = tmp;
        }
        tmp++;
    }

    /* Add space for trailing token. */
    count += last_comma < (a_str + strlen(a_str) - 1);

    /* Add space for terminating null string so caller
       knows where the list of returned strings ends. */
    count++;

    result = malloc(sizeof(char*) * count);

    if (result)
    {
        size_t idx  = 0;
        char* token = strtok(a_str, delim);

        while (token)
        {
            assert(idx < count);
            *(result + idx++) = strdup(token);
            token = strtok(0, delim);
        }
        assert(idx == count - 1);
        *(result + idx) = 0;
    }

    return result;
}


int main(void)
{
  // 0000, 0000
  //  NNN   NNN

  // Registers needed
  // eax, ebx // 32-bit?
  // si       // 16-bit?

  // R holds the counter NN
  // S holds string address NNN
  // Loop R, S

  // mov R, 5   // time to repeat
  // mov S, NNN // String

  // if R, X, S R = N // register
  //            X = N // register
  //            S = string to print
  //
  //  loop 5, "str"  - print str 5 times
  //  mov r, 5       - mov 5 into r
  //  ifr 5, "world" - if r==5, print world

  char *inst = "loop  5, hello";
  parseInst(inst);

	char months[] = "JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC";
    char** tokens;

    printf("months=[%s]\n\n", months);

    tokens = str_split(months, ',');

    if (tokens)
    {
        int i;
        for (i = 0; *(tokens + i); i++)
        {
            printf("month=[%s]\n", *(tokens + i));
            free(*(tokens + i));
        }
        printf("\n");
        free(tokens);
    }

  return 0;
}
