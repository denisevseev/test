{\rtf1\ansi\ansicpg1251\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function serialize(arr) \{\
    const buffer = new Uint16Array(arr);\
    return String.fromCharCode(...buffer);\
\}\
\
function deserialize(str) \{\
    const result = new Uint16Array(str.length);\
    for (let i = 0; i < str.length; i++) \{\
        result[i] = str.charCodeAt(i);\
    \}\
    return Array.from(result);\
\}\
\
function compressionRatio(original, compressed) \{\
    return ((1 - compressed.length / JSON.stringify(original).length) * 100).toFixed(2) + '%';\
\}\
\
function runTests() \{\
    const tests = [\
        Array.from(\{ length: 50 \}, () => Math.floor(Math.random() * 300) + 1),\
        Array.from(\{ length: 100 \}, () => Math.floor(Math.random() * 300) + 1),\
        Array.from(\{ length: 500 \}, () => Math.floor(Math.random() * 300) + 1),\
        Array.from(\{ length: 1000 \}, () => Math.floor(Math.random() * 300) + 1),\
        Array.from(\{ length: 300 \}, (_, i) => [i + 1, i + 1, i + 1]).flat()\
    ];\
\
    for (const data of tests) \{\
        const compressed = serialize(data);\
        const decompressed = deserialize(compressed);\
        console.log(JSON.stringify(data) === JSON.stringify(decompressed), compressionRatio(data, compressed));\
    \}\
\}\
\
runTests();\
}