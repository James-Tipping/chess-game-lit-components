// Tasks:
// - SVG on left if possible
// - Try to keep state of scroll position
// - Improve match page aesthetics
// - Perhaps select by score
// - Implement router - perhaps need to clone github repository and paste components in
// - Separate component for match data
// same details

/**
 * weqweyieu
 * wqeiqwopeiqe
 * eiqeiepeo
 * 
 */




import "./elements/leaderboard";
import './elements/person-details';
import './elements/test-component';
// import './elements/error-view';
import "./elements/modal";

import {Router} from '@vaadin/router';
const router = new Router(document.getElementById('body'));

router.setRoutes([
    {path: '/', component: 'leader-dashboard', action: async () => {await import('./elements/leaderboard');}},
    {path: '/match/:id', component: 'match-view', action: async () => {await import('./elements/match');}}
]);

export { router };

