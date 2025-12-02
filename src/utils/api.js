const CACHE_VERSION = "v18";
const CACHE_NAME = `partgo-cache-${CACHE_VERSION}`;

async function getCachedData(key, fetchFn, expireHours = 1) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(key);
    if (cached) {
      const { data, timestamp } = await cached.json();
      const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
      if (ageHours < expireHours) return data;
    }
  } catch (e) {
    console.warn("Cache not available", e);
  }
  const freshData = await fetchFn();
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(key, new Response(JSON.stringify({ data: freshData, timestamp: Date.now() })));
  } catch (e) {}
  return freshData;
}

export async function loadEmployeeData() {
  const url = `https://opensheet.elk.sh/1eqVoLsZxGguEbRCC5rdI4iMVtQ7CK4T3uXRdx8zE3uw/Employee?_=${Date.now()}`;
  return getCachedData('employee-data', async () => {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Load employee failed');
    return res.json();
  }, 24); // Cache 24 ชม.
}

export async function loadData() { // สำหรับ Parts
  const url = `https://opensheet.elk.sh/1nbhLKxs7NldWo_y0s4qZ8rlpIfyyGkR_Dqq8INmhYlw/MainSap?_=${Date.now()}`;
  return getCachedData('parts-data', async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Load parts failed');
    return res.json();
  }, 2);
}

// เพิ่มฟังก์ชันอื่น ๆ เช่น loadTodayData, loadPendingCallsData เหมือนใน JS เดิม
