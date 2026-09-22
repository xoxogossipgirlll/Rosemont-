import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://oyozlzoxxdvxmdjipcmf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nIhBXF05viKsJ8vLqUbdnA_yF7mOLkO';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById('gossipForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const msg = document.getElementById('message').value.trim();
  const nickname = document.getElementById('nickname').value.trim();

  if (!msg) return;

  const blocked = /https?:\/\/|@|\+?\d[\d\s-]{7,}/i.test(msg);

  if (blocked) {
    status.textContent =
      'Please remove contact details or links. Your submission was not sent.';
    return;
  }

  status.textContent = 'Sending...';

  const { error } = await supabase
    .from('submissions')
    .insert({
      message: msg,
      nickname: nickname || null,
      status: 'pending'
    });

  if (error) {
    console.error(error);
    status.textContent = 'Something went wrong. Please try again.';
    return;
  }

  status.textContent =
    'Received. Your gossip is now pending review. Nothing is published automatically. ♡';

  form.reset();
});
