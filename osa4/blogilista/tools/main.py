import sys
from req import Req

def main():
    method = sys.argv[1]
    tool = Req("http://localhost:3003", "hobbit", "toor", "Anonymous Hobbit")

    if method in {"fill", "-f"}:
        tool.userCreate("/api/users")
        tool.fill("/api/blogs")
    elif method in {"reset", "-r"}:
        tool.reset("/db")
    elif method in {"del", "-d"}:
        tool.userCreate("/api/users")
        tool.bpost("/api/blogs")
        tool.delete("/api/blogs")
    else:
        print("Wrong option")

if __name__ == '__main__':
    main()
