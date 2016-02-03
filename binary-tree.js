'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        //create new Node item and fill it by input data
        let node = new Node(data);
        if (!this.root) {
            this.root = node;
            return;
        }

        let current = this.root;
        //add new item to a tree according to binary tree property
        while (true) {
            if (data < current.data) {
                if (current.left === null) {
                    current.left = node;
                    break;
                } else {
                    current = current.left;
                }
            } else if (data > current.data) {
                if (current.right === null) {
                    current.right = node;
                    break;
                } else {
                    current = current.right;
                }
            } else break;
        }
    }

    contains(data) {
        let current = this.root;

        while (current) {
            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
                //the value is found
            } else {
                return true;
            }
        }
        //the value isn't found
        return false;
    }

    /*******************************
    REMOVE VARIANT 1
    *******************************/
    /*remove(data) {
        let parent = null;
        let current = this.root;

        while (current) {
            if (data < current.data) {
                parent = current;
                current = current.left;
            } else if (data > current.data) {
                parent = current;
                current = current.right;
                //if the value is found
            } else {
                //figure out number of children
                //and consider 6 types of node location
                let childNumber = (current.left === null ? 0 : 1) +
                    (current.right === null ? 0 : 1);

                switch (childNumber) {
                    case 0:
                        //type 1: no children, the value is at the root
                        if (!parent) {
                            this.root = null;
                        }
                        //type 2: no children, remove a leaf node from the parent
                        else if (data < parent.data) {
                            parent.left = null;
                        } else {
                            parent.right = null;
                        }
                        break;
                    case 1:
                        //type 3: one child, the value is at the root
                        if (!parent) {
                            this.root = (current.left === null ? current.right : current.left);
                        }
                        //type 4: one child, just reassign to parent
                        else if (data < parent.data) {
                            parent.left = (current.left === null ? current.right : current.left);
                        }
                        else {
                            parent.right = (current.left === null ? current.right : current.left);
                        }
                        break;
                    case 2:
                        //types 5-6: node has two children
                        let replacementParent = current;
                        let replacement = current.left;

                        //find the rightmost node
                        while (replacement.right) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        //remove founded replacement from the old location
                        replacementParent.right = replacement.left;

                        //assign children to the replacement
                        replacement.right = current.right;
                        if (replacement !== current.left) {
                            replacement.left = current.left;
                        }

                        if (!parent) {
                            this.root = replacement;
                        } else if (data < parent.data) {
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }
                        break;
                }
                break;
            }
        }
    }*/

    /*******************************
     REMOVE VARIANT 2
     *******************************/
    remove(data) {
        this.root = remove(this.root, data);

        function remove(node, data) {
            if (!node) {
                return null;
            }

            if (data < node.data) {
                node.left = remove(node.left, data);
                return node;
            } else if (data > node.data) {
                node.right = remove(node.right, data);
                return node;
            } else {
                //if node has no children
                if (node.left === null && node.right === null) {
                    return null;
                }
                //if node has only one child
                if (node.left === null || node.right === null) {
                    return node.left === null ? node.right : node.left;
                }
                //if node has two children
                if (node.left !== null || node.right !== null) {
                    let current = node.left;

                    //find the rightmost node
                    while (current.right) {
                        current = current.right;
                    }
                    node.data = current.data;
                    node.left = remove(node.left, current.data);

                    return node;
                }
            }
        }
    }

    size() {
        return preorderTraversal(this.root, 0);

        function preorderTraversal(node, counter) {
            if (!node) {
                return counter;
            }

            let leftCounter = preorderTraversal(node.left, 0);
            let rightCounter = preorderTraversal(node.right, 0);

            return counter + leftCounter + rightCounter + 1;
        }
    }

    isEmpty() {
        return this.root === null;
    }
}
