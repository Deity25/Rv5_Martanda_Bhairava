import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";

export default function TempleSection({
  temples,
  mailarGallery,
  templeProfiles,
  filteredTemples,
  stateFilter,
  templeSearch,
  onStateFilterChange,
  onTempleSearchChange,
  language,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerLayerRef = useRef(null);
  const markersRef = useRef(new Map());
  const [selectedTempleId, setSelectedTempleId] = useState(filteredTemples[0]?.id || temples[0]?.id || "");

  const stateOptions = useMemo(() => [...new Set(temples.map((item) => item.state))].sort(), [temples]);
  const profileByTempleId = useMemo(() => {
    const profileMap = new Map();
    templeProfiles.forEach((profile) => {
      profileMap.set(profile.templeId, profile);
    });
    return profileMap;
  }, [templeProfiles]);

  const selectedTemple = useMemo(
    () => filteredTemples.find((item) => item.id === selectedTempleId) || filteredTemples[0] || temples[0],
    [filteredTemples, selectedTempleId, temples]
  );
  const selectedProfile = selectedTemple ? profileByTempleId.get(selectedTemple.id) : null;

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return undefined;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      minZoom: 4,
      maxZoom: 13,
    }).setView([17.6, 75.8], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 30);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerLayerRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    markersRef.current.clear();

    filteredTemples.forEach((temple) => {
      const popupHtml = `
        <div>
          <strong>${language === "mr" ? temple.nameMr : temple.name}</strong><br/>
          <span>${temple.district}, ${temple.state}</span><br/>
          <small>${language === "mr" ? temple.significanceMr : temple.significanceEn}</small><br/>
          <small>Festivals: ${temple.keyFestivals}</small>
        </div>
      `;

      const marker = L.circleMarker([temple.lat, temple.lng], {
        radius: 7,
        fillColor: "#ffbe3a",
        color: "#472700",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(layer);

      marker.bindPopup(popupHtml, { maxWidth: 300 });
      markersRef.current.set(temple.id, marker);
    });

    if (filteredTemples.length > 0) {
      const bounds = L.latLngBounds(filteredTemples.map((temple) => [temple.lat, temple.lng]));
      map.fitBounds(bounds.pad(0.18));
    }
  }, [filteredTemples, language]);

  useEffect(() => {
    if (!selectedTempleId && filteredTemples.length > 0) {
      setSelectedTempleId(filteredTemples[0].id);
      return;
    }

    const selectedStillVisible = filteredTemples.some((item) => item.id === selectedTempleId);
    if (!selectedStillVisible && filteredTemples.length > 0) {
      setSelectedTempleId(filteredTemples[0].id);
    }
  }, [filteredTemples, selectedTempleId]);

  const focusTemple = (temple) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setSelectedTempleId(temple.id);
    map.flyTo([temple.lat, temple.lng], 8, { duration: 0.8 });
    const marker = markersRef.current.get(temple.id);
    marker?.openPopup();
  };

  return (
    <section id="temples" className="temples section-frame">
      <div className="section-head">
        <p className="section-tag lang-en">Temple Network</p>
        <p className="section-tag lang-mr">मंदिर जाळे</p>
        <h2 className="lang-en">Temple Atlas: Jejuri, Bidar Side, and Wider Routes</h2>
        <h2 className="lang-mr">मंदिर नकाशा: जेजुरी, बीदर परिसर आणि विस्तृत यात्रामार्ग</h2>
      </div>

      <div className="atlas-layout">
        <div className="map-panel ornate">
          <div className="map-controls">
            <label className="lang-en" htmlFor="stateFilter">
              Filter by state
            </label>
            <label className="lang-mr" htmlFor="stateFilter">
              राज्यानुसार निवडा
            </label>
            <select
              id="stateFilter"
              aria-label="Filter temples by state"
              value={stateFilter}
              onChange={(event) => onStateFilterChange(event.target.value)}
            >
              <option value="all">All states</option>
              {stateOptions.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>

            <label className="lang-en" htmlFor="templeSearch">
              Search temple
            </label>
            <label className="lang-mr" htmlFor="templeSearch">
              मंदिर शोधा
            </label>
            <input
              id="templeSearch"
              type="text"
              value={templeSearch}
              onChange={(event) => onTempleSearchChange(event.target.value)}
              placeholder="Jejuri / Bidar / Mallanna"
            />
          </div>

          <div ref={mapContainerRef} id="map" className="leaflet-map" aria-label="Temple map"></div>
        </div>

        <div className="atlas-side">
          <article className="panel glowing">
            <h3 className="lang-en">Bidar Side Note</h3>
            <h3 className="lang-mr">बीदर परिसर नोंद</h3>
            <p className="lang-en">
              As requested, this atlas includes Bidar-side traditions: especially Mailar
              Mallanna/Khandoba worship clusters around Khanapur-Mailar and nearby villages.
            </p>
            <p className="lang-mr">
              तुमच्या सूचनेनुसार, या नकाशात बीदर परिसरातील मायलार मल्लण्णा/खंडोबा परंपरा
              समाविष्ट केली आहे, विशेषतः खानापूर-मायलार व आसपासच्या गावांचा संदर्भ.
            </p>
          </article>

          <article className="panel">
            <h3 className="lang-en">Map Accuracy</h3>
            <h3 className="lang-mr">नकाशा अचूकता</h3>
            <p className="lang-en">
              Coordinates are curated for visualization (mostly town/shrine centroids). Use local
              temple boards and official administration records for travel-critical navigation.
            </p>
            <p className="lang-mr">
              नकाशातील समन्वय दृश्य मांडणीसाठी संकलित आहेत (बहुतेक गाव/देवस्थान केंद्रबिंदू).
              प्रवासासाठी स्थानिक मंदिर समिती किंवा अधिकृत नोंदी तपासा.
            </p>
          </article>

          <article className="panel ornate mailar-gallery-panel">
            <h3 className="lang-en">Mailar Photo Gallery</h3>
            <h3 className="lang-mr">मायलार फोटो गॅलरी</h3>
            <div className="mailar-gallery-grid">
              {mailarGallery.map((item) => (
                <a
                  key={item.id}
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-card"
                >
                  <img src={item.image} alt={item.titleEn} loading="lazy" />
                  <p className="lang-en">{item.titleEn}</p>
                  <p className="lang-mr">{item.titleMr}</p>
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>

      <div className="table-wrap ornate">
        <table className="data-table" aria-label="Temple details table">
          <thead>
            <tr>
              <th className="lang-en">Temple</th>
              <th className="lang-mr">मंदिर</th>
              <th className="lang-en">State</th>
              <th className="lang-mr">राज्य</th>
              <th className="lang-en">District</th>
              <th className="lang-mr">जिल्हा</th>
              <th className="lang-en">Speciality</th>
              <th className="lang-mr">वैशिष्ट्य</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemples.map((temple) => (
              <tr
                key={temple.id}
                className={`reveal-item temple-row ${selectedTemple?.id === temple.id ? "active-row" : ""}`}
                onClick={() => focusTemple(temple)}
              >
                <td className="lang-en">
                  <strong>{temple.name}</strong>
                  <br />
                  <small>{temple.category}</small>
                </td>
                <td className="lang-mr">
                  <strong>{temple.nameMr}</strong>
                  <br />
                  <small>{temple.category}</small>
                </td>
                <td className="lang-en">{temple.state}</td>
                <td className="lang-mr">{temple.state}</td>
                <td className="lang-en">{temple.district}</td>
                <td className="lang-mr">{temple.district}</td>
                <td className="lang-en">{temple.significanceEn}</td>
                <td className="lang-mr">{temple.significanceMr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTemple ? (
        <div id="temple-profiles" className="temple-profile-block panel ornate">
          <div className="profile-head">
            <div>
              <h3 className="lang-en">Temple Detail Page</h3>
              <h3 className="lang-mr">मंदिर सविस्तर पृष्ठ</h3>
            </div>
            <select
              className="profile-select"
              value={selectedTemple.id}
              onChange={(event) => {
                const chosen = temples.find((item) => item.id === event.target.value);
                if (chosen) {
                  focusTemple(chosen);
                }
              }}
            >
              {temples.map((item) => (
                <option key={item.id} value={item.id}>
                  {language === "mr" ? item.nameMr : item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="temple-profile-grid">
            <div className="temple-profile-photo">
              <img
                src={
                  selectedProfile?.image ||
                  "https://commons.wikimedia.org/wiki/Special:FilePath/Khandoba%20temple%20jejuri.jpg"
                }
                alt={selectedTemple.name}
                loading="lazy"
              />
            </div>

            <div className="temple-profile-content">
              <h4 className="lang-en">{selectedTemple.name}</h4>
              <h4 className="lang-mr">{selectedTemple.nameMr}</h4>
              <p className="lang-en">
                {selectedTemple.district}, {selectedTemple.state} | Altitude: {selectedTemple.altitudeM} m
              </p>
              <p className="lang-mr">
                {selectedTemple.district}, {selectedTemple.state} | उंची: {selectedTemple.altitudeM} मीटर
              </p>
              <p className="lang-en">{selectedTemple.significanceEn}</p>
              <p className="lang-mr">{selectedTemple.significanceMr}</p>

              <div className="temple-profile-meta">
                <article className="meta-card">
                  <h5 className="lang-en">Darshan & Timing</h5>
                  <h5 className="lang-mr">दर्शन व वेळ</h5>
                  <p className="lang-en">
                    {selectedProfile?.darshanEn ||
                      "Daily darshan timings vary by temple board and festival dates; verify locally."}
                  </p>
                  <p className="lang-mr">
                    {selectedProfile?.darshanMr ||
                      "दैनिक दर्शन वेळ मंदिर समिती व सणानुसार बदलू शकते; स्थानिक पडताळणी आवश्यक."}
                  </p>
                </article>
                <article className="meta-card">
                  <h5 className="lang-en">Travel Notes</h5>
                  <h5 className="lang-mr">प्रवास नोंदी</h5>
                  <p className="lang-en">
                    {selectedProfile?.travelEn ||
                      "Use district HQ bus/rail hubs; last-mile access may require local transport."}
                  </p>
                  <p className="lang-mr">
                    {selectedProfile?.travelMr ||
                      "जिल्हा मुख्यालय बस/रेल्वे केंद्र वापरा; शेवटच्या टप्प्यासाठी स्थानिक वाहतूक लागते."}
                  </p>
                </article>
                <article className="meta-card">
                  <h5 className="lang-en">Ritual Speciality</h5>
                  <h5 className="lang-mr">विधी वैशिष्ट्य</h5>
                  <p className="lang-en">
                    {selectedProfile?.ritualsEn ||
                      `Key local festivals: ${selectedTemple.keyFestivals}.`}
                  </p>
                  <p className="lang-mr">
                    {selectedProfile?.ritualsMr ||
                      `मुख्य उत्सव: ${selectedTemple.keyFestivals}.`}
                  </p>
                </article>
                <article className="meta-card">
                  <h5 className="lang-en">Stay & Planning</h5>
                  <h5 className="lang-mr">निवास व नियोजन</h5>
                  <p className="lang-en">
                    {selectedProfile?.stayEn ||
                      "For jatra days, reserve stay early and keep buffer time for crowd movement."}
                  </p>
                  <p className="lang-mr">
                    {selectedProfile?.stayMr ||
                      "जत्राकाळात आगाऊ निवास आरक्षण व गर्दीसाठी अतिरिक्त वेळ ठेवा."}
                  </p>
                </article>
              </div>

              {selectedProfile?.imageSource ? (
                <small className="profile-source">
                  <a href={selectedProfile.imageSource} target="_blank" rel="noopener noreferrer">
                    Image source
                  </a>
                </small>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
