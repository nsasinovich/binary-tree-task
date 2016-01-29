'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		//create new Node item and fill it by input data
		var node = new Node(data);
		var current;

		//special case: the tree is empty yet
		if (this.root === null) {
			this.root = node;
		} else {
			current = this.root;

			//add new item to a tree according to binary tree property
			while(true) {
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
	}

	contains(data) {

	}

	remove(data) {

	}

	size() {

	}

	isEmpty() {

	}
}
