(() => {
  const all = window.PALM_COVE_QUOTES || [];
  const categories = ['All voices','Walkability & Access','Village Character','Traffic & Parking'];
  const quoteBox=document.querySelector('.quote');
  const text=document.querySelector('.quote-text');
  const meta=document.querySelector('.meta');
  const progress=document.querySelector('.progress');
  const pause=document.querySelector('#pause');
  let active='All voices', items=[...all], index=0, playing=true, timer;

  function announce(){
    const q=items[index];
    text.textContent='“'+q.quote+'”';
    meta.textContent=`${q.category} • ${q.question} response`;
    document.querySelector('#counter').textContent=`${index+1} of ${items.length}`;
  }
  function resetProgress(){progress.classList.remove('go'); void progress.offsetWidth; if(playing) progress.classList.add('go')}
  function show(nextIndex){
    if(!items.length)return;
    quoteBox.classList.add('hiding');
    setTimeout(()=>{index=(nextIndex+items.length)%items.length;announce();quoteBox.classList.remove('hiding');resetProgress()},420);
  }
  function schedule(){clearInterval(timer);if(playing)timer=setInterval(()=>show(index+1),3000);resetProgress()}
  document.querySelector('#next').addEventListener('click',()=>{show(index+1);schedule()});
  document.querySelector('#prev').addEventListener('click',()=>{show(index-1);schedule()});
  pause.addEventListener('click',()=>{playing=!playing;pause.textContent=playing?'Pause':'Play';pause.setAttribute('aria-label',playing?'Pause quote rotation':'Resume quote rotation');schedule()});
  document.querySelector('.tabs').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected','false'));b.setAttribute('aria-selected','true');
    active=b.dataset.category;items=active==='All voices'?[...all]:all.filter(x=>x.category===active);index=0;show(0);schedule();
  });
  document.querySelector('#total').textContent=all.length;
  announce();schedule();
})();
