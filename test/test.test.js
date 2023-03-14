import { expect } from '@esm-bundle/chai';
// import '../main';
import { elementUpdated, fixture, waitUntil } from '@open-wc/testing';
import { querySelectorDeep, querySelectorAllDeep } from 'query-selector-shadow-dom';
import { sendMouse } from '@web/test-runner-commands'
import '../elements/match-view';


// it('can instantiate an element', async () => {
//   const leader = await fixture('<leader-dashboard></leader-dashboard>');
//   await elementUpdated(leader);
//   // expect(el.getAttribute('foo')).to.equal('bar');
//   // console.log(leader.innerHTML);
  
//   // expect(leader).to.contain('div');
//   // expect(leader.shadowRoot.querySelector('.leaderboard')).to.exist
//   expect(querySelectorDeep('leader-dashboard')).to.exist;
//   expect(querySelectorDeep('leader-dashboard')).to.exist
// });

// it('person-details component rendered', async () => {
//   const person = await fixture(`<person-details .playerData=${{
//     username: "vinceblitzsociety",
//     points: 1,
//     is_winner: false
//   }}></person-details>`);
//   await elementUpdated(person)
//   expect(querySelectorDeep('person-details')).to.exist;
// });


// it('Clicking on person brings up match details', async () => {
//   const leader = await fixture('<leader-dashboard></leader-dashboard');
//   await elementUpdated(leader);
//   const leaderboard = querySelectorDeep('.leaderboard');
//   leaderboard.dispatchEvent(new CustomEvent('match-requested', {
//     detail: {
//       name: "BogdanDeac"
//     }
//   }));

//   await waitUntil(
//     () => querySelectorDeep('match-view'), 'Match details did not appear'
//   )
//   // const x = setTimeout(() => expect(querySelectorDeep('match-view')).to.exist(), 3000);
//   // expect(querySelectorDeep('match-view')).to.exist();
// });

it('Clicking back button brings up leaderboard', async () => {
  
  const matchView = await fixture(`<match-view .matchId="68948742149"></match-view>`);
  await elementUpdated(matchView);
  debugger

  // await waitUntil(() => querySelectorDeep('.back-button'));
  // const backButton = querySelectorDeep('.back-button');
  // const [x, y] = [Math.round(backButton.getBoundingClientRect().x) + 1, Math.round(backButton.getBoundingClientRect().y) + 1]
  
  
  // await sendMouse({
  //   type: 'click',
  //   position: [x, y],
  //   button: 'left'
  // });

  // await waitUntil(() => querySelectorDeep('.leaderboard'), 'Leaderboard not present');

  // const y = setTimeout(() => expect(querySelectorDeep('.leaderboard')).to.exist, 3000);
});

// How to click?
// How to await instead of waiting for setTimeout
// How to pass url to matchView component?
// Why does rendering person-details not 'expected' behaviour?