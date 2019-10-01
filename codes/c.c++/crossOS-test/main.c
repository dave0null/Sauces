#include <stdio.h>

#define p(a) printf(a);

int main(void)
{
  // WSAstartup
  // create socket
  // connect
  // send
  // recv

  #ifdef _WIN32
   //define something for Windows (32-bit and 64-bit, this part is common)
   #ifdef _WIN64
      //define something for Windows (64-bit only)
      p("win64\n");
   #else
      //define something for Windows (32-bit only)
      p("win32\n");
   #endif
  #else
    // Linux
    p("linux!\n");
  #endif
  return 0;
}
