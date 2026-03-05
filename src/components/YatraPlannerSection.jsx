import { useEffect, useMemo, useState } from "react";
function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthKm * c;
}
function isCoordAvailable(node) {
  return typeof node?.lat === "number" && typeof node?.lng === "number";
}
export default function YatraPlannerSection({ temples, specialNodes, circuits, language }) {
  const [selectedCircuitId, setSelectedCircuitId] = useState(circuits[0]?.id || "");
  const [selectedStopIds, setSelectedStopIds] = useState(circuits[0]?.stops || []);
  const [addStopId, setAddStopId] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const allNodes = useMemo(() => {
    const templeNodes = temples.map((item) => ({
      id: item.id,
      labelEn: item.name,
      labelMr: item.nameMr,
      lat: item.lat,
      lng: item.lng,
      kind: "temple",
      subEn: `${item.district}, ${item.state}`,
      subMr: `${item.district}, ${item.state}`,
    }));

    const extraNodes = specialNodes.map((item) => ({
      id: item.id,
      labelEn: item.labelEn,
      labelMr: item.labelMr,
      lat: item.lat,
      lng: item.lng,
      kind: "special",
      subEn: item.noteEn,
      subMr: item.noteMr,
    }));

    return [...templeNodes, ...extraNodes];
  }, [temples, specialNodes]);

  const allNodeById = useMemo(() => {
    const map = new Map();
    allNodes.forEach((item) => map.set(item.id, item));
    return map;
  }, [allNodes]);

  const selectedCircuit = useMemo(
    () => circuits.find((item) => item.id === selectedCircuitId) || circuits[0],
    [circuits, selectedCircuitId]
  );

  const selectedStops = useMemo(
    () => selectedStopIds.map((id) => allNodeById.get(id)).filter(Boolean),
    [selectedStopIds, allNodeById]
  );

  const segmentData = useMemo(() => {
    const segments = [];
    let totalRoadKm = 0;
    let totalDriveHours = 0;
    let unknownSegments = 0;

    for (let index = 0; index < selectedStops.length - 1; index += 1) {
      const from = selectedStops[index];
      const to = selectedStops[index + 1];

      if (isCoordAvailable(from) && isCoordAvailable(to)) {
        const straightKm = haversineKm(from.lat, from.lng, to.lat, to.lng);
        const roadKm = straightKm * 1.22;
        const driveHours = roadKm / 48;

        totalRoadKm += roadKm;
        totalDriveHours += driveHours;

        segments.push({
          from,
          to,
          straightKm,
          roadKm,
          driveHours,
          unknown: false,
        });
      } else {
        unknownSegments += 1;
        segments.push({
          from,
          to,
          unknown: true,
        });
      }
    }

    const ritualHours = Math.max(1, selectedStops.length * 0.75);
    const totalJourneyHours = totalDriveHours + ritualHours;

    return {
      segments,
      totalRoadKm,
      totalDriveHours,
      ritualHours,
      totalJourneyHours,
      unknownSegments,
    };
  }, [selectedStops]);

  const mapsLink = useMemo(() => {
    const geoStops = selectedStops.filter((item) => isCoordAvailable(item));
    if (geoStops.length < 2) return "";

    const origin = `${geoStops[0].lat},${geoStops[0].lng}`;
    const destination = `${geoStops[geoStops.length - 1].lat},${geoStops[geoStops.length - 1].lng}`;
    const waypoints = geoStops
      .slice(1, -1)
      .map((item) => `${item.lat},${item.lng}`)
      .join("|");

    const params = new URLSearchParams({
      api: "1",
      origin,
      destination,
      travelmode: "driving",
    });

    if (waypoints) {
      params.set("waypoints", waypoints);
    }

    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }, [selectedStops]);

  useEffect(() => {
    if (!selectedCircuit) return;
    setSelectedStopIds(selectedCircuit.stops);
  }, [selectedCircuit]);

  const moveStop = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= selectedStopIds.length) return;

    const next = [...selectedStopIds];
    const [picked] = next.splice(index, 1);
    next.splice(nextIndex, 0, picked);
    setSelectedStopIds(next);
  };

  const removeStop = (index) => {
    setSelectedStopIds((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addStop = () => {
    if (!addStopId || selectedStopIds.includes(addStopId)) return;
    setSelectedStopIds((prev) => [...prev, addStopId]);
    setAddStopId("");
  };

  const buildPlanText = () => {
    const lines = [];
    const title = language === "mr" ? "यात्रा मार्ग योजना" : "Yatra Route Plan";
    lines.push(title);
    lines.push("=");
    lines.push(language === "mr" ? `परिक्रमा: ${selectedCircuit?.nameMr || "Custom"}` : `Circuit: ${selectedCircuit?.nameEn || "Custom"}`);
    lines.push("");

    lines.push(language === "mr" ? "थांबे:" : "Stops:");
    selectedStops.forEach((stop, index) => {
      lines.push(`${index + 1}. ${language === "mr" ? stop.labelMr : stop.labelEn}`);
    });

    lines.push("");
    lines.push(
      language === "mr"
        ? `एकूण अंदाजे रस्ता अंतर: ${segmentData.totalRoadKm.toFixed(0)} किमी`
        : `Estimated total road distance: ${segmentData.totalRoadKm.toFixed(0)} km`
    );
    lines.push(
      language === "mr"
        ? `अंदाजे वाहन वेळ: ${segmentData.totalDriveHours.toFixed(1)} तास`
        : `Estimated driving time: ${segmentData.totalDriveHours.toFixed(1)} hours`
    );
    lines.push(
      language === "mr"
        ? `विधी/दर्शन वेळ (अंदाज): ${segmentData.ritualHours.toFixed(1)} तास`
        : `Ritual/darshan buffer (estimate): ${segmentData.ritualHours.toFixed(1)} hours`
    );
    lines.push(
      language === "mr"
        ? `एकूण यात्रा वेळ: ${segmentData.totalJourneyHours.toFixed(1)} तास`
        : `Total yatra estimate: ${segmentData.totalJourneyHours.toFixed(1)} hours`
    );

    if (segmentData.unknownSegments > 0) {
      lines.push(
        language === "mr"
          ? `सूचना: ${segmentData.unknownSegments} टप्प्यांसाठी अचूक भू-निर्देशांक उपलब्ध नाहीत.`
          : `Note: ${segmentData.unknownSegments} segment(s) have no exact geocoordinates.`
      );
    }

    return lines.join("\n");
  };

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(buildPlanText());
      setCopyStatus(language === "mr" ? "योजना कॉपी झाली" : "Plan copied");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (_error) {
      setCopyStatus(language === "mr" ? "कॉपी अयशस्वी" : "Copy failed");
      setTimeout(() => setCopyStatus(""), 2200);
    }
  };

  const downloadPlan = () => {
    const text = buildPlanText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "khandoba-yatra-plan.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="yatra" className="yatra section-frame">
      <div className="section-head">
        <p className="section-tag lang-en">Pilgrimage Planner</p>
        <p className="section-tag lang-mr">यात्रा नियोजक</p>
        <h2 className="lang-en">Yatra Route Planner</h2>
        <h2 className="lang-mr">यात्रा मार्ग नियोजक</h2>
      </div>

      <div className="yatra-layout">
        <article className="panel ornate">
          <h3 className="lang-en">Select Circuit</h3>
          <h3 className="lang-mr">परिक्रमा निवडा</h3>
          <select
            className="profile-select"
            value={selectedCircuitId}
            onChange={(event) => setSelectedCircuitId(event.target.value)}
          >
            {circuits.map((item) => (
              <option key={item.id} value={item.id}>
                {language === "mr" ? item.nameMr : item.nameEn}
              </option>
            ))}
          </select>
          <p className="lang-en">{selectedCircuit?.infoEn}</p>
          <p className="lang-mr">{selectedCircuit?.infoMr}</p>

          <div className="route-add-row">
            <select value={addStopId} onChange={(event) => setAddStopId(event.target.value)}>
              <option value="">{language === "mr" ? "थांबा जोडा" : "Add stop"}</option>
              {allNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {language === "mr" ? node.labelMr : node.labelEn}
                </option>
              ))}
            </select>
            <button className="btn outline" onClick={addStop}>
              {language === "mr" ? "जोड़ा" : "Add"}
            </button>
          </div>

          <ol className="route-stop-list">
            {selectedStops.map((stop, index) => (
              <li key={`${stop.id}-${index}`}>
                <div>
                  <strong className="lang-en">{stop.labelEn}</strong>
                  <strong className="lang-mr">{stop.labelMr}</strong>
                  <p className="lang-en">{stop.subEn}</p>
                  <p className="lang-mr">{stop.subMr}</p>
                </div>
                <div className="route-actions">
                  <button className="btn ghost" onClick={() => moveStop(index, -1)} aria-label="Move up">
                    ↑
                  </button>
                  <button className="btn ghost" onClick={() => moveStop(index, 1)} aria-label="Move down">
                    ↓
                  </button>
                  <button className="btn ghost" onClick={() => removeStop(index)} aria-label="Remove stop">
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel ornate">
          <h3 className="lang-en">Distance & Time Estimate</h3>
          <h3 className="lang-mr">अंतर व वेळ अंदाज</h3>

          <div className="yatra-stats-grid">
            <div className="meta-card">
              <h5 className="lang-en">Road Distance</h5>
              <h5 className="lang-mr">रस्ता अंतर</h5>
              <p>{segmentData.totalRoadKm.toFixed(0)} km</p>
            </div>
            <div className="meta-card">
              <h5 className="lang-en">Driving Time</h5>
              <h5 className="lang-mr">वाहन वेळ</h5>
              <p>{segmentData.totalDriveHours.toFixed(1)} h</p>
            </div>
            <div className="meta-card">
              <h5 className="lang-en">Ritual Buffer</h5>
              <h5 className="lang-mr">विधी वेळ</h5>
              <p>{segmentData.ritualHours.toFixed(1)} h</p>
            </div>
            <div className="meta-card">
              <h5 className="lang-en">Total Estimate</h5>
              <h5 className="lang-mr">एकूण अंदाज</h5>
              <p>{segmentData.totalJourneyHours.toFixed(1)} h</p>
            </div>
          </div>

          <div className="table-wrap route-segment-wrap">
            <table className="data-table" aria-label="Route segments">
              <thead>
                <tr>
                  <th className="lang-en">From -> To</th>
                  <th className="lang-mr">पासून -> पर्यंत</th>
                  <th className="lang-en">Road km</th>
                  <th className="lang-mr">रस्ता किमी</th>
                  <th className="lang-en">Drive h</th>
                  <th className="lang-mr">वाहन तास</th>
                </tr>
              </thead>
              <tbody>
                {segmentData.segments.map((segment, index) => (
                  <tr key={`${segment.from.id}-${segment.to.id}-${index}`}>
                    <td className="lang-en">
                      {segment.from.labelEn} -> {segment.to.labelEn}
                    </td>
                    <td className="lang-mr">
                      {segment.from.labelMr} -> {segment.to.labelMr}
                    </td>
                    <td>{segment.unknown ? "--" : segment.roadKm.toFixed(0)}</td>
                    <td>{segment.unknown ? "--" : segment.roadKm.toFixed(0)}</td>
                    <td>{segment.unknown ? "--" : segment.driveHours.toFixed(1)}</td>
                    <td>{segment.unknown ? "--" : segment.driveHours.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {segmentData.unknownSegments > 0 ? (
            <p className="route-warning lang-en">
              {segmentData.unknownSegments} segment(s) include a node with unconfirmed map coordinates.
            </p>
          ) : null}
          {segmentData.unknownSegments > 0 ? (
            <p className="route-warning lang-mr">
              {segmentData.unknownSegments} टप्प्यांमध्ये अपुष्ट नकाशा समन्वय असलेले स्थळ आहे.
            </p>
          ) : null}

          <div className="route-export-row">
            <button className="btn solid" onClick={copyPlan}>
              {language === "mr" ? "योजना कॉपी" : "Copy plan"}
            </button>
            <button className="btn outline" onClick={downloadPlan}>
              {language === "mr" ? "TXT डाउनलोड" : "Download TXT"}
            </button>
            {mapsLink ? (
              <a className="btn ghost" href={mapsLink} target="_blank" rel="noopener noreferrer">
                {language === "mr" ? "Google Maps उघडा" : "Open in Google Maps"}
              </a>
            ) : null}
          </div>

          {copyStatus ? <small className="copy-status">{copyStatus}</small> : null}
        </article>
      </div>
    </section>
  );
}

