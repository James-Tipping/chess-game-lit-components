import "./elements/leaderboard";
import './elements/person-details';
import "./elements/match-route-controller";
import './elements/match-view';
import "./elements/modal";
import "@vaadin/text-field";
import "@vaadin/icons";
import "@vaadin/icon";
import "@vaadin/tooltip";
import "@vaadin/multi-select-combo-box";

import {Router} from '@vaadin/router';
const router = new Router(document.getElementById('body') || document.body);

router.setRoutes([
    {path: '/', component: 'leader-dashboard', action: async () => {await import('./elements/leaderboard');}},
    {path: '/match/:id', component: 'match-route-controller', action: async () => {await import('./elements/match-route-controller');}}
]);

export { router };

