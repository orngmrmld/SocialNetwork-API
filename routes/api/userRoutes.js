const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getAllUsers).post(createUser);

// /api/students/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/students/:userId/friends
// router.route('/:userId/friends');

// /api/students/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
