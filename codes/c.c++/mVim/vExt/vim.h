#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

/* HELPERS */
#define s_malloc(NAME) ( NAME * )malloc(sizeof( NAME ))
#define pp(MSG, arg) printf( #MSG , arg)
//#define dprintf(VAL, ARG) printf(#VAL, ARG)

/* CONSTANTS*/
#define SIG_DEBUG_MODE 0
#define BUFFER_SIZE 16
/* WRAPPERS */
/* API */
/* TYPEDEFS */

typedef struct { // sig_t
  char sig[4];
  char version[2];
  char str_len[2];
  char alg_type[2];
  char m[BUFFER_SIZE];
  char j[BUFFER_SIZE];
} sig_t;
typedef struct { // fvim_t
  char fname[64];
  sig_t *s;
  FILE *fp;
} fvim_t;

sig_t* createSig(const char *, unsigned int, unsigned int, const char *);
fvim_t * v_create(const char *, const char *);
char cRand();
char *encrypt(const char *);
fvim_t * v_open(const char *);
void v_info(fvim_t *);
void v_read(fvim_t *);
void v_write(fvim_t *, const char *);
void v_close(fvim_t *);
