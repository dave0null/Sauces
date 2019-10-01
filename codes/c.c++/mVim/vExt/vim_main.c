/*
 * **** API
 * open
 *    create vs open
 * read
 * write
 * close
 *
 * describe
 *  crypt file
 *  decrypt
 *
 *  BINARY 4 byte = 1 integer
 *  header 16-byte
 *    signiture version unused unused
 *                      string algorithm type
 *                      length
 *
 *
 * fvim *v = v_open("something.vim");
   *
   * v_read(&v, len, alg_type);  // Read secret message
   * v_write(&v, len, alg_type); // Write scret message
   *
   * v_close(v);
* */
#include "v.h"

int main(int argc, char **argv)
{
  printf("[%d]\n", argc);
  fvim_t *v = v_open("ello.vim"); // Opens for reading if file exists
  if(v != NULL)
  {
    v_info(v);
    v_read(v);
    v_close(v);
  }
  // */
  // Use create for creating new files?
  // This create but not store info into buffer?
  //pp(I guess file dont exist lol. Creating... %d\n, 0);
  v_create("ello.vim", "superSecret"); // returns null if file exists
  // Create then open it? pass it to that variable
  // check the v_info

  return 0;
}
