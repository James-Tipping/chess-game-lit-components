import { Router } from '@vaadin/router';
export function initialiseRouter() {
    const router = new Router(document.getElementById('body'));
    router.setRoutes([
        { path: '/', component: 'leader-dashboard', action: async () => { await import('./elements/leaderboard'); } },
        { path: '/match/:id', component: 'match-view', action: async () => { await import('./elements/match'); } }
    ]);
    window.router = router;
}
//# sourceMappingURL=router.js.map