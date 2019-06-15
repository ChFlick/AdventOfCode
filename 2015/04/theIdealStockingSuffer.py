import hashlib

input = "yzbqklnj"
hash: str = hashlib.md5(input.encode('utf-8')).hexdigest()

i = 0
while not hash.startswith("00000"):
    i = i + 1
    hash = hashlib.md5((input + str(i)).encode("utf-8")).hexdigest()

print(i)
print(hash)