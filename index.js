import Tree from "./binary-search-tree.js";

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


  function getRandomNumbersArray(length) {
    const randomNumbers = [];
    
    for (let i = 0; i < length; i++) {
      randomNumbers.push(Math.floor(Math.random() * 100));
    }
    
    return randomNumbers;
  }
  
  // Example Usage
const randomArray = getRandomNumbersArray(10);

const tree = new Tree(randomArray);

console.log(tree.isBalanced())

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

tree.insert(150);
tree.insert(1800);
tree.insert(500);
tree.insert(200);

prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.rebalance();

prettyPrint(tree.root);
console.log(tree.isBalanced());
