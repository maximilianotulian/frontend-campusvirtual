import groups from 'constants/groups';

export default {
    isStudent: (user) => {
        return userHasGroup(user, groups.STUDENT);
    },
    isTeacher: (user) => {
        return userHasGroup(user, groups.TEACHER);
    },
    isManager: (user) => {
        return userHasGroup(user, groups.MANAGER);
    }
};

function userHasGroup(user, groupName) {
    let hasGroup = false;
    
    user.groups.forEach((userGroup) => {
        if (userGroup.name === groupName) {
            hasGroup = true;
        }
    });
    
    return hasGroup;
};