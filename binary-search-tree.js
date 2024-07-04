class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array){

        this.root = this.buildTree(array);

    }

    removeDuplicatesandSort(array) {
        return [...new Set(array)].sort((a,b) => a - b);
    }

    buildTree(array){
        array = this.removeDuplicatesandSort(array);
        return this.buildTreeRecursively(array, 0, array.length - 1);
    }

    buildTreeRecursively(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = this.buildTreeRecursively(array, start, mid - 1);
        node.right = this.buildTreeRecursively(array, mid + 1, end);

        return node;
    }

    insert(value) {
        this.root = this.insertRecursively(this.root, value)
    }

    insertRecursively(node, value) {
        if (node === null){
            return new Node(value);
        }

        if(value < node.value){
            node.left = this.insertRecursively(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertRecursively(node.right, value);
        }

        return node;
    }

    deleteItem(value) {
        this.root = this.deleteRecursively(this.root, value) 
    }
    
    deleteRecursively(node, value) {
        if(node === null) {
            return node;
        }

        if(value < node.value) {
            node.left = this.deleteRecursively(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteRecursively(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            node.value = this.minValue(node.right);

            node.right = this.deleteRecursively(node.right, node.value);

        }
        return node;
    }

    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value
    }

    find(value) {
        return this.findRecursively(this.root, value);
    }

    findRecursively(node, value) {

        if(node === null || node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this.findRecursively(node.left, value);
        } else if (value > node.value) {
            return this.findRecursively(node.right, value);
        }
    }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

prettyPrint(tree.root);

const treeFind = tree.find(67);
console.log(treeFind);

 