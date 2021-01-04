## RSSchool Node.js Task

## Caesar cipher CLI tool

CLI Tool to transform inputs using [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

#### Install

1. Clone or download repository
2. Run ```npm install``` to download required packages

#### Usage

```bash
$ node caesar_cipher_cli/index.js --action <encode|decode> --shift <number> [--input <input>] [--output <output>]
```
| Option | Description |
| :------ |---------- |
|*-s, --shift <number>*|shift value|
|*-a, --action \<encode\|decode>*|action to perform (encode/decode)|
|*-i, --input \<input>*|input file (if none then stdin is used)|
|*-o, --output <output>*|output file (if none then stdout is used)|
|*-h, --help*|display help for command|

**Usage example:**

*In caesar_cipher_cli directory*

```bash
$ node 1.index.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node 1.index.js --action encode --shift 7 --input input.txt --output output.txt
```

```bash
$ node 1.index.js --action decode --shift 7 --input output.txt --output decoded.txt
```
**Result example:**

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
