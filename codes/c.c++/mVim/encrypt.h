/*
 * File:   encrypt.h
 * Date:   8 May 1999
 * Author: Bret Taylor (bstaylor@stanford.edu)
 * -------------------------------------------
 * A library for simple, textual encryption and decryption
 * procedures based on a 1-byte (8-bit) key.
 */

#ifndef _encrypt_h_
#define _encrypt_h_

#include <stdio.h>


/*
 * Function: EncodeFile
 * --------------------
 * Given the 1-byte key, thsi function will read all of the contents
 * of textFile and write the newly encrypted version to outputFile.
 */
void EncodeFile(FILE *textFile, FILE *outputFile, unsigned char key);


/*
 * Function: DecodeFile
 * --------------------
 * Given the 1-byte key, this function will read all of the contents
 * of encodedFile and write the the decrypted version to outputFile.
 */
void DecodeFile(FILE *encodedFile, FILE *outputFile, unsigned char key);


#endif
