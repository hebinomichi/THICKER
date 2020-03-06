import * as CUtils from './utils'
import * as StringUtils from '../string_utils/string_modules'

/**
 * Converts hex string to base64 string
 * @param hexInput 
 */
export function hexToBase64(hexInput: string): string {
    const bin: string = CUtils.padding(CUtils.hexToBin(hexInput));
    return CUtils.binTo64(bin)
}

/**
 * Xor two hex strings together
 * @param hex1 
 * @param hex2 
 */
export function fixedHexXor(hex1: string, hex2: string):string {
    if (hex1.length !== hex2.length){
        throw Error ("inputs should be of same length")
    }
    const xored = CUtils.xor(CUtils.hexToBin(hex1),CUtils.hexToBin(hex2));
    let result = "";
    StringUtils.chunkString(xored,4)?.forEach(elt =>{
        result = result + CUtils.BIN_TO_HEX[elt] 
    })
    return result;
}

/**
 * Creates a single repeating key cipher to xor an hex input
 * @param inputHex 
 * @param inputKey 0 -255
 */
export function singleByteXorCipher(inputHex: string, inputKey: number):string {

    const hex = inputHex.toUpperCase();
    const bin: string = CUtils.hexToBin(hex);
    let binKey = inputKey.toString(2);
    // padding the key to fit 8 bytes
    binKey = "0".repeat(8 - binKey.length) + binKey;
    if(binKey.length !== 8){
        throw Error ("8 bytes required 0 - 255");
    }
    let cipher = binKey.repeat(bin.length/8);
    return CUtils.binToAscii(CUtils.xor(bin,cipher));
}

/**
 * Encrypts a message with a repeating key
 * @param message 
 * @param inputKey 
 */
export function repeatingKeyXor(message: string, inputKey: string):string {
    let buffer = "";
    for (let i = 0; i < message.length; i++) {
        const char = message.charAt(i);
        const keyChar = inputKey.charAt(i%inputKey.length)
        buffer += CUtils.xorSingleByte(char,keyChar)
    }
    return CUtils.binToHex(buffer);

}

/**
 * 
 */
export function belovedAlg(hex: string):string {
    return "1";
}
