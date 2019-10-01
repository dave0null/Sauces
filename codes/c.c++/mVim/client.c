/*
 * File:   client.c
 * Date:   8 May 1999
 * Author: Bret Taylor (bstaylor@stanford.edu)
 * -------------------------------------------
 * A simple client of the encrypt library.  It simply takes the
 * names of the input and output files and a key a calls the
 * library functions to decode/encode.
 */

#include <stdio.h>
#include <ctype.h>		/* For tolower() */
#include "encrypt.h"


/*
 * Type Definition: bool
 * ---------------------
 * A more readable way to represent true/false values.  It relies
 * on the fact that, in C, all non-zero values are "true" and 0
 * is "false".
 */
typedef enum { false, true } bool;


/*
 * Main Program
 * ------------
 * This program takes four arguments:
 *   (1) A "-d" or "-e" switch to indicate "decoding" or "encoding"
 *   (2) The name of the input file (a text file or, in the case
 *       of the "-d" switch, a file that has already been encoded).
 *   (3) The name of the file which the user wants output to be
 *       to.
 *   (4) A one-character "key" used for the encoding and decoding
 *       algorithms.
 */
int main(int argc, char *argv[])
{
	bool encode;
	FILE *input, *output;

	if (argc == 5) {
		encode = (tolower(argv[1][1]) == 'e');
	} else {
		fprintf(stderr, "format: %s [-de] [file name] [output file] [key]\n", argv[0]);
		return -1;
	}

	if ((input = fopen(argv[2], "r"))) {
		if ((output = fopen(argv[3], "w"))) {
			if (encode) EncodeFile(input, output, argv[4][0]);
			else DecodeFile(input, output, argv[4][0]);
		} else {
			fprintf(stderr, "%s: Unable to open\n", argv[3]);
		}
	} else {
		fprintf(stderr, "%s: File not found\n", argv[2]);
	}

	return 0;
}
