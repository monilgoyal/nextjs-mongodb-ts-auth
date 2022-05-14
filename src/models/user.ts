import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    _todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
})

const TaskListSchema = new mongoose.Schema({
    name: String,
    tasks: {
        title: String,
        desc: String,
        completeDate: String,
        status: Boolean
    }
})

export interface UserType extends mongoose.Document {
    name: String,
    email: Object,
    password: String,
    _todo: [Object]
};
export interface TaskListType extends mongoose.Document {
    name: String,
    tasks: {
        title: String,
        desc: String,
        completeDate: String,
        status: Boolean
    }
};


export const User = mongoose.models.User || mongoose.model<UserType>('User', UserSchema);
export const TaskList = mongoose.models.User || mongoose.model<TaskListType>('User', TaskListSchema);

// export const TaskList = mongoose.model<TaskListType>('Todo', TaskListSchema);
// export const User = mongoose.model<UserType>('User', UserSchema);




// module.exports = mongoose.models.User || mongoose.model('User', UserSchema)


// module.exports = {
//     User: mongoose.models.User || mongoose.model('User', UserSchema),
//     TaskList: mongoose.models.TaskList || mongoose.model('TaskList', TaskListSchema),
// };

// exports.TaskList = mongoose.models.TaskList || mongoose.model('TaskList', TaskListSchema)
// exports.User = mongoose.models.User || mongoose.model('User', UserSchema)