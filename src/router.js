import _ from 'lodash';
import Apps from 'components-app';
import * as DemoPage from 'components-app/demo';
import groups from 'constants/groups';
import store from 'lib-vuex/store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            component: Apps.Layout,
            path: '',
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: Apps.HomePage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    }
                }
            ]
        },
        {
            component: Apps.Layout,
            path: '/exams',
            children: [
                {
                    name: 'exams',
                    path: '',
                    component: Apps.TeachersExamsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER]
                    },
                },
                {
                    name: 'student-exams',
                    path: '',
                    component: Apps.StudentExams,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT]
                    },
                }
            ]
        },
        {
            component: Apps.Layout,
            path: '/subjects',
            children: [
                {
                    name: 'subjects-list',
                    path: '',
                    component: Apps.SubjectsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                },
                {
                    name: 'subject',
                    path: ':subjectId',
                    component: Apps.SubjectPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    }
                },
                {
                    name: 'createNew',
                    path: ':subjectId/new',
                    component: Apps.NewsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER]
                    }
                },
                {
                    name: 'editNew',
                    path: ':subjectId/edit/:newId',
                    component: Apps.NewsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER]
                    }
                },
                {
                    name: 'removeNew',
                    path: ':subjectId/remove/:newId',
                    component: Apps.NewsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER]
                    }
                },
                {
                    name: 'subject-students',
                    path: ':subjectId/students',
                    component: Apps.SubjectStudentsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    }
                },
                {
                    name: 'subject-exams',
                    path: ':subjectId/exams',
                    component: Apps.ExamsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER, groups.MANAGER]
                    }
                },
                {
                    name: 'subject-exam-form',
                    path: ':subjectId/exams/:examId',
                    component: Apps.ExamFormPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER]
                    }
                },
                {
                    name: 'subject-exam-results',
                    path: ':subjectId/exams/:examId/results',
                    component: Apps.ExamResultsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.TEACHER]
                    }
                }
            ]
        },
        {
            component: Apps.Layout,
            path: '/calendar',
            children: [
                {
                    name: 'calendar',
                    path: '',
                    component: Apps.CalendarPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                },
                {
                    name: 'createEvent',
                    path: 'event/new',
                    component: Apps.EventsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                },
                {
                    name: 'editEvent',
                    path: 'event/edit/:eventId',
                    component: Apps.EventsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                },
                {
                    name: 'removeEvent',
                    path: 'event/remove/:eventId',
                    component: Apps.EventsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                }
            ],
        },
        {
            component: Apps.Layout,
            path: '/profile',
            children: [
                {
                    name: 'profile',
                    path: '',
                    component: Apps.ProfilePage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                }
            ],
        },
        {
            component: Apps.Layout,
            path: '/aboutUs',
            children: [
                {
                    name: 'aboutUs',
                    path: '',
                    component: Apps.AboutUsPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                }
            ],
        },
        {
            component: Apps.Layout,
            path: '/contact',
            children: [
                {
                    name: 'contact',
                    path: '',
                    component: Apps.ContactPage,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                }
            ],
        },
        {
            component: Apps.Admin.Layout,
            path: '/admin',
            children: [
                {
                    name: 'admin',
                    path: '',
                    component: Apps.Admin.Home,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    },
                },
                {
                    name: 'admin-students',
                    path: 'students/',
                    component: Apps.Admin.Students,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    },
                },
                {
                    name: 'admin-student-abm',
                    path: 'students/:objectId',
                    component: Apps.Admin.StudentForm,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    }
                },
                {
                    name: 'admin-teachers',
                    path: 'teachers/',
                    component: Apps.Admin.Teachers,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    },
                },
                {
                    name: 'admin-teacher-invite',
                    path: 'teachers/invite',
                    component: Apps.Admin.TeachersInviteForm,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    }
                },
                {
                    name: 'admin-teacher-abm',
                    path: 'teachers/:objectId',
                    component: Apps.Admin.TeachersForm,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    }
                },
                {
                    name: 'admin-roles',
                    path: 'roles/',
                    component: Apps.Admin.Roles,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    },
                },
                {
                    name: 'admin-department',
                    path: 'department/',
                    component: Apps.Admin.Departments,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    },
                },
                {
                    name: 'admin-department-abm',
                    path: 'department/:objectId',
                    component: Apps.Admin.DepartmentForm,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    }
                },
                {
                    name: 'admin-subject',
                    path: 'subject/',
                    component: Apps.Admin.Subjects,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    },
                },
                {
                    name: 'admin-subject-abm',
                    path: 'subject/:objectId',
                    component: Apps.Admin.SubjectForm,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.MANAGER]
                    }
                },
            ],
        },
        {
            name: 'login',
            path: '/login',
            component: Apps.LoginPage,
            meta: {
                requiresAuth: false,
                requiredGroups: [groups.ANY]
            }
        },
        {
            name: 'teachers-register',
            path: '/teachers/register',
            component: Apps.TeachersRegisterPage,
            meta: {
                requiresAuth: false,
                requiredGroups: [groups.ANY]
            },
        },
        {
            path: '/help',
            component: Apps.Layout,
            meta: {
                requiresAuth: true,
                requiredGroups: [groups.ANY]
            },
            children: [
                {
                    name: 'help',
                    path: '',
                    component: Apps.FrequentlyAskedQuestions,
                    meta: {
                        requiresAuth: true,
                        requiredGroups: [groups.STUDENT, groups.TEACHER, groups.MANAGER]
                    },
                }
            ]
        },
        {
            name: 'demo',
            path: '/demo',
            component: DemoPage.Main,
            meta: {
                requiresAuth: false,
                requiredGroups: [groups.ANY]
            },
            children: [
                {
                    name: 'buttonDemo',
                    path: '/demo/button',
                    component: DemoPage.ButtonDemo,
                    meta: {
                        requiresAuth: false,
                        requiredGroups: [groups.ANY]
                    }
                },
                {
                    name: 'inputDemo',
                    path: '/demo/input',
                    component: DemoPage.InputDemo,
                    meta: {
                        requiresAuth: false,
                        requiredGroups: [groups.ANY]
                    }
                },
                {
                    name: 'animationDemo',
                    path: '/demo/animation',
                    component: DemoPage.AnimationDemo,
                    meta: {
                        requiresAuth: false,
                        requiredGroups: [groups.ANY]
                    }
                },
                {
                    name: 'modalDemo',
                    path: '/demo/modal',
                    component: DemoPage.ModalDemo,
                    meta: {
                        requiresAuth: false,
                        requiredGroups: [groups.ANY]
                    }
                },
                {
                    name: 'drawerDemo',
                    path: '/demo/drawer',
                    component: DemoPage.DrawerDemo,
                    meta: {
                        requiresAuth: false,
                        requiredGroups: [groups.ANY]
                    }
                },
                {
                    name: 'newsDemo',
                    path: '/demo/news',
                    component: DemoPage.NewsDemo,
                    meta: {
                        requiresAuth: false,
                        requiredGroups: [groups.ANY]
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAutorized = store.getters['user/isAutorized'];
        const userStore = store.state.user.user;
        const requiredGroups = to.meta.requiredGroups;

        if (isAutorized) {
            if (_.includes(requiredGroups, 'any')) {
                next()
            } else if (userHasAccess(userStore.groups, to.meta.requiredGroups)) {
                next()
            } else {
                next({name: 'login'});
            }
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
});

function userHasAccess (userGroups, requiredGroups) {
    let userHasAccess = false;

    userGroups.every((group) => {
        if (_.includes(requiredGroups, group.name)) {
            userHasAccess = true;
        }

        return !userHasAccess;
    });

    return userHasAccess;
}

export default router;
