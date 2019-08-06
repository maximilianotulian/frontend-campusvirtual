import * as types from 'lib-vuex/mutation-types';
import { serviceCaller } from 'lib-core/services/service-caller';
import updatesService from 'app/services/updates-services';

export default {
    getAll ({commit, state}) {
        return new Promise((resolve, reject) => {
            let countUpdatesService = updatesService.getService('countUpdates');

            serviceCaller.doRequest(countUpdatesService)
                .then(handleCountUpdatesSuccess)
                .catch(handleCountUpdatesFail);

                function handleCountUpdatesSuccess (response) {
                    let updatesBySubject = {}
                    const updatesCount = response.reduce((acu, subject) => acu + subject.total, 0);

                    response.forEach((subject) => {
                        updatesBySubject[subject.subject] = subject.total;
                    });

                    commit(types.GET_UPDATES_COUNT_SUCCESS, {updatesBySubject, updatesCount});
                    resolve();
                }

                function handleCountUpdatesFail (error) {
                    commit(types.GET_UPDATES_COUNT_FAIL, error);
                    reject();
                }
            });
    }
}
