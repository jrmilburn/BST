class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export default class Tree {
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

    levelOrder(callback) {
        if(!this.root) return [];

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();

            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return callback ? undefined : result;
    }

    inOrder(callback) {
        const result = [];
        this.inOrderRecursively(this.root, callback, result);
        return callback ? undefined : result;
    }

    inOrderRecursively(node, callback, result) {
        if (!node) return;

        this.inOrderRecursively(node.left, callback, result);

        if (callback) {
            callback(node);
        } else {
            result.push(node.value);
        }

        this.inOrderRecursively(node.right, callback, result);
    }

    preOrder(callback) {
        const result = [];
        this.preOrderRecursively(this.root, callback, result);
        return callback ? undefined : result;
    }

    preOrderRecursively(node, callback, result) {
        if(!node) return;

        if(callback) {
            callback(node);
        } else {
            result.push(node.value);
        }

        this.preOrderRecursively(node.left, callback, result);
        this.preOrderRecursively(node.right, callback, result);
    }

    postOrder(callback) {
        const result = [];
        this.postOrderRecursively(this.root, callback, result);
        return callback ? undefined : result;
    }

    postOrderRecursively(node, callback, result) {

        if(!node) return;

        this.postOrderRecursively(node.left, callback, result);
        this.postOrderRecursively(node.right, callback, result);

        if (callback) {
            callback(node);
        } else {
            result.push(node.value);
        }

    }

    height(node) {
        if(node === null) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {

        if (node === null) {
            return -1;
        }

        let depth = 0;
        let current = this.root;

        while (current !== null) {
            if(node.value === current.value){
                return depth
            } else if (node.value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;

        }

        return -1;

    }

    isBalanced() {
        return this.checkBalance(this.root) !== -1;
    }

    checkBalance(node) {
        if (node === null) {
            return 0;
        }

        const leftHeight = this.checkBalance(node.left);
        if(leftHeight === -1) return -1;

        const rightHeight = this.checkBalance(node.right);
        if(rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    inOrderTraversal(node, array) {
        if (node !== null) {
            this.inOrderTraversal(node.left, array);
            array.push(node.value);
            this.inOrderTraversal(node.right, array);
        }
        return array;
    }

    rebalance() {
        const nodesArray = [];
        this.inOrderTraversal(this.root, nodesArray);
        this.root = this.buildTree(nodesArray);
    }


}



 