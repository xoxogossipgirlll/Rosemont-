const form=document.getElementById('gossipForm');const status=document.getElementById('status');
form.addEventListener('submit',e=>{e.preventDefault();const msg=document.getElementById('message').value.trim();if(!msg)return;const blocked=/https?:\/\/|@|\+?\d[\d\s-]{7,}/i.test(msg);if(blocked){status.textContent='Please remove contact details or links. Your submission was not sent.';return}status.textContent='Received. Your gossip is now pending review. Nothing is published automatically. ♡';form.reset();});
// DATABASE HOOK:
// After adding your Supabase URL/key, replace the demo submit handler with:
// await supabase.from('submissions').insert({message: msg, nickname: nickname || null, status:'pending'});
