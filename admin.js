import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const SUPABASE_URL='https://oyozlzoxxdvxmdjipcmf.supabase.co';
const SUPABASE_ANON_KEY='sb_publishable_nIhBXF05viKsJ8vLqUbdnA_yF7mOLkO';
const supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const $=id=>document.getElementById(id);
let filter='pending';
async function load(){
 const {data,error}=await supabase.from('submissions').select('*').eq('status',filter).order('created_at',{ascending:false});
 if(error){$('queue').textContent=error.message;return}
 $('queue').innerHTML=data.map(x=>`<article style="background:white;border:1px solid #eadfe3;padding:22px;margin:12px 0"><small>${new Date(x.created_at).toLocaleString()} · ${x.nickname||'Anonymous'}</small><p style="font-size:18px;line-height:1.5">${escapeHtml(x.message)}</p><button class="button" onclick="changeStatus('${x.id}','published')">Approve</button> <button class="button" onclick="editPost('${x.id}',${JSON.stringify(x.message)})">Edit</button> <button class="button" onclick="changeStatus('${x.id}','rejected')">Reject</button> <button class="button" onclick="removePost('${x.id}')">Delete</button></article>`).join('')||'<p>No posts here.</p>';
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
window.changeStatus=async(id,status)=>{await supabase.from('submissions').update({status}).eq('id',id);load()};
window.editPost=async(id,old)=>{const message=prompt('Edit gossip:',old);if(message&&message.trim())await supabase.from('submissions').update({message:message.trim()}).eq('id',id);load()};
window.removePost=async id=>{if(confirm('Delete permanently?')){await supabase.from('submissions').delete().eq('id',id);load()}};
$('loginBtn').onclick=async()=>{const {error}=await supabase.auth.signInWithPassword({email:$('email').value,password:$('password').value});if(error)$('loginStatus').textContent=error.message;else{ $('login').style.display='none';$('dashboard').style.display='block';load()}};
$('logout').onclick=async()=>{await supabase.auth.signOut();location.reload()};
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;load()});
supabase.auth.getSession().then(({data})=>{if(data.session){$('login').style.display='none';$('dashboard').style.display='block';load()}});
