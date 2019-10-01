/*
 * File:   encrypt.c
 * Date:   8 May 1999
 * Author: Bret Taylor (bstaylor@stanford.edu)
 * -------------------------------------------
 * This is the implementation for the encrypt.h library.  This
 * library uses bit manipulation to consistently map characters
 * to an unreadable format that is also 8 bits in length.  It does
 * so with the bitwise XOR operator (^), which returns which bits
 * are on in the first operand, but not in both.  The useful thing
 * about this operator is that a variable XOR'd with another can be
 * returned to its original state simply by XORing it with that
 * variable again.  Hence, this library (internally, anyway) doesn't
 * even make a distinction between encrypting and decrypting (both
 * simply require XORing each character in the input file)!
 */

#include "encrypt.h"
#include <assert.h>


/* Private Function Prototypes */
static void ApplyKeyToFile(FILE *in, FILE *out, unsigned char key);


/*
 * Public Function: EncodeFile
 * ---------------------------
 * This function is simply a wrapper function for the ApplyKeyToFile
 * decoder/encoder function.
 */
void EncodeFile(FILE *textFile, FILE *outputFile, unsigned char key)
{
	assert(textFile && outputFile);
	ApplyKeyToFile(textFile, outputFile, key);
}


/*
 * Public Function: DecodeFile
 * ---------------------------
 * This function is simply a wrapper function for the ApplyKeyToFile
 * decoder/encoder function.
 */
void DecodeFile(FILE *encodedFile, FILE *outputFile, unsigned char key)
{
	assert(encodedFile && outputFile);
	ApplyKeyToFile(encodedFile, outputFile, key);
}


/*
 * Function: ApplyKeyToFile
 * ------------------------
 * This function reads in characters from the in file, applying
 * the bitwise XOR operator on each.  It then writes those characters
 * to out.  Read this file's comments for a detailed explanation why
 * this function makes no distinction between "encoding" and
 * "decoding".
 */
static void ApplyKeyToFile(FILE *in, FILE *out, unsigned char key)
{
	int ch;

	while ((ch = getc(in)) != EOF)
		putc(ch ^ key, out);
}
