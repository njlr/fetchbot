# fetchbot

`fetchbot` is a simple tool for fetching files with a known SHA256 hash. You can use `fetchbot` as a building-block in your build-scripts to ensure reproducible builds. 

This is just a proof-of-concept, and there are many improvements that could be made! 

## Usage

First, you create a stub file like this: 

`example.zip.fetchbot`

```json=
{
  "urls": [
    "https://github.com/ojdkbuild/ojdkbuild/releases/download/1.8.0.141-1/java-1.8.0-openjdk-1.8.0.141-2.b16.el6_9.x86_64.zip"
  ], 
  "sha256": "ccb2db52f90b91251a5af52c48da8774434bba2ad366c4734bfc8b153b67d466"
}
```

Then, you run `fetchbot` on the stub: 

```bash=
$ fetchbot example.zip.fetchbot
```

`fetchbot` will download the file to `example.zip` (the `.fetchbot` extension is removed) and verify the hash: 

```bash=
$ ls
example.zip.fetchbot
example.zip
```

