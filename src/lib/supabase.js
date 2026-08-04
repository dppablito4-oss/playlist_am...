import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================================
//  Persistencia Global de Estado Web (`estado_web`)
// ==========================================================
export const getGlobalWebState = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('estado_web').select('*').eq('id', 1).single();
      if (!error && data) {
        return {
          respuesta: data.respuesta || 'PENDIENTE',
          fecha_respuesta: data.fecha_respuesta || null,
        };
      }
    } catch (e) {
      console.warn('Supabase estado_web fetch error, using local fallback', e);
    }
  }

  const local = localStorage.getItem('saly_global_web_state');
  return local ? JSON.parse(local) : { respuesta: 'PENDIENTE', fecha_respuesta: null };
};

export const updateGlobalWebState = async (respuesta) => {
  const payload = {
    id: 1,
    respuesta,
    fecha_respuesta: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from('estado_web').upsert(payload);
    } catch (e) {
      console.warn('Supabase estado_web update error, saving locally', e);
    }
  }

  localStorage.setItem('saly_global_web_state', JSON.stringify(payload));
  return payload;
};

// ==========================================================
//  Helpers de Likes & Notas de Amor
// ==========================================================
export const getLikesState = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('song_likes').select('*');
      if (!error && data) {
        const likesMap = {};
        data.forEach(item => { likesMap[item.song_id] = item.count; });
        return likesMap;
      }
    } catch (e) {
      console.warn('Supabase likes fetch error, fallback', e);
    }
  }
  
  const local = localStorage.getItem('saly_song_likes');
  return local ? JSON.parse(local) : { 101: 24, 102: 18, 103: 31, 201: 42, 301: 15, 401: 19, 501: 11 };
};

export const incrementLike = async (songId) => {
  if (supabase) {
    try {
      const { data } = await supabase.rpc('increment_song_like', { song_id_param: songId });
      if (data) return data;
    } catch (e) {
      console.warn('Supabase RPC error, updating locally', e);
    }
  }

  const local = localStorage.getItem('saly_song_likes');
  const likesMap = local ? JSON.parse(local) : {};
  likesMap[songId] = (likesMap[songId] || 10) + 1;
  localStorage.setItem('saly_song_likes', JSON.stringify(likesMap));
  return likesMap[songId];
};

export const getLoveNotes = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('love_notes').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase love_notes fetch error, fallback', e);
    }
  }

  const local = localStorage.getItem('saly_love_notes');
  if (local) return JSON.parse(local);

  const initialNotes = [
    { id: 1, sender: 'Pablito', content: 'Cada canción de esta lista me recuerda a un momento mágico contigo, Saly.', created_at: new Date().toISOString() },
    { id: 2, sender: 'S&S', content: 'Nuestra música siempre nos conectará sin importar el camino. Te quiero.', created_at: new Date().toISOString() }
  ];
  localStorage.setItem('saly_love_notes', JSON.stringify(initialNotes));
  return initialNotes;
};

export const addLoveNote = async (sender, content) => {
  const newNote = { sender, content, created_at: new Date().toISOString() };
  
  if (supabase) {
    try {
      const { data, error } = await supabase.from('love_notes').insert([newNote]).select();
      if (!error && data) return data[0];
    } catch (e) {
      console.warn('Supabase insert note error, saving locally', e);
    }
  }

  const notes = await getLoveNotes();
  newNote.id = Date.now();
  const updated = [newNote, ...notes];
  localStorage.setItem('saly_love_notes', JSON.stringify(updated));
  return newNote;
};
