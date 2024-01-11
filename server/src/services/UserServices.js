import { hashPassword } from '../helpers/hash.js';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/users.js';
import { ProductModel } from '../models/products.js';
import { UserProductModel } from '../models/UserProduct.js';


export async function getAllUsers() {
    try {
        const users = await UserModel.findAll();

        if (!users) {
            throw new Error('No users found');
        }

        return users;
    } catch (error) {
        return ('Error while fetching all users');
    }
};


export async function getUserById(userId) {
    try {
        const user = await UserModel.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        return ('Error while fetching user by ID');
    }
}


export async function createUser(user) {
    try {
        const existinnUser = await UserModel.findOne({ where: { email: user.email } });
        if (existinnUser) {
            return('User already exists');
        }

        const hashedPassword = await hashPassword(user.password);
        const newUser = await UserModel.create({ ...user, password: hashedPassword });

        return newUser;
    } catch (error) {
        return ('Error while creating user');
    }
};


export async function deleteUser(id) {
    try {
        const deletedUser = await UserModel.destroy({ where: { id } });

        if (!deletedUser) {
            return('User not found for deletion');
        }

        return 'User deleted successfully';
    } catch (error) {
        return ('Error while deleting user');
    }
};


export async function updateUser(id, user) {
    try {
        if (user.password) {
            const hashedPassword = await hashPassword(user.password);
            user.password = hashedPassword;
        };

        const [updated] = await UserModel.update(user, 
            { where: { id },
         });

         if (!updated) {
             return('User not found for updation');
         }

            return 'User updated successfully';
    } catch (error) {
        return ('Error while updating user');
    }
};


export async function loginUser({email, password}) {
    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return('Incorrect password');
        }

        return user;
    } catch (error) {
        return ('Error while logging in user');
    }
};



export async function addToCart(userId, productId, quantity) {
  try {
    const [user, created] = await UserProductModel.findOrCreate({
      where: { userId, productId },
      defaults: { quantity }
    });

    if (!created) {
      user.quantity += quantity;
      await user.save();
    }

    return user;
  } catch (error) {
    return ('Error while adding to cart');
  }
};

export async function getCartContents(userId) {
  try {
    const user = await UserModel.findByPk(userId, {
      include: ProductModel
    });

    if (!user) {
      return ('User not found');
    }

    return user.products;
  } catch (error) {
    return ('Error while getting cart contents');
  }
};
