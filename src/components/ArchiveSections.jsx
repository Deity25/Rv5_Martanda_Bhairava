export default function ArchiveSections({ data }) {
  return (
    <>
      <section id="overview" className="overview section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Archive Snapshot</p>
          <p className="section-tag lang-mr">संग्रहाची झलक</p>
          <h2 className="lang-en">Khandoba Tradition at a Glance</h2>
          <h2 className="lang-mr">खंडोबा परंपरा एका दृष्टीक्षेपात</h2>
        </div>

        <div className="stat-grid">
          {data.quickStats.map((item) => (
            <article key={item.key} className="stat-card reveal-item">
              <p className="stat-label lang-en">{item.labelEn}</p>
              <p className="stat-label lang-mr">{item.labelMr}</p>
              <p className="stat-value lang-en">{item.value}</p>
              <p className="stat-value lang-mr">{item.valueMr}</p>
            </article>
          ))}
        </div>

        <div className="text-panels">
          <article className="panel">
            <h3 className="lang-en">Who is Khandoba?</h3>
            <h3 className="lang-mr">खंडोबा कोण?</h3>
            <p className="lang-en">
              Khandoba is widely revered as a regional form of Shiva (often identified as Martanda
              Bhairava), with worship deeply rooted in agrarian, pastoral, warrior, and village
              deity traditions across Maharashtra and adjoining regions.
            </p>
            <p className="lang-mr">
              खंडोबा हा शिवाचा प्रादेशिक रूप (मार्तंड भैरव) मानला जातो. महाराष्ट्र आणि
              सीमाभागात शेती, पशुपालक, योद्धा आणि ग्रामदेव परंपरांमध्ये त्याची भक्ती खोलवर
              रुजलेली आहे.
            </p>
          </article>

          <article className="panel">
            <h3 className="lang-en">Myth + History + Living Ritual</h3>
            <h3 className="lang-mr">पुराणकथा + इतिहास + जिवंत विधी</h3>
            <p className="lang-en">
              This project intentionally presents three layers together: textual lore, historical
              references, and present-day devotional practice. Distinctions are marked where
              certainty differs.
            </p>
            <p className="lang-mr">
              या प्रकल्पात तीन स्तर एकत्र मांडले आहेत: ग्रंथपरंपरा, ऐतिहासिक नोंदी आणि आजची
              जिवंत भक्ती. ज्या ठिकाणी खात्रीचा स्तर वेगळा आहे तेथे स्पष्ट नोंद दिली आहे.
            </p>
          </article>
        </div>
      </section>

      <section id="manuscripts" className="manuscripts section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Texts & Knowledge</p>
          <p className="section-tag lang-mr">ग्रंथ आणि ज्ञानपरंपरा</p>
          <h2 className="lang-en">Manuscripts and Textual Traditions</h2>
          <h2 className="lang-mr">हस्तलिखिते आणि ग्रंथपरंपरा</h2>
        </div>

        <div className="table-wrap ornate">
          <table className="data-table" aria-label="Manuscript table">
            <thead>
              <tr>
                <th className="lang-en">Text</th>
                <th className="lang-mr">ग्रंथ</th>
                <th className="lang-en">Period</th>
                <th className="lang-mr">कालखंड</th>
                <th className="lang-en">Language</th>
                <th className="lang-mr">भाषा</th>
                <th className="lang-en">Highlights</th>
                <th className="lang-mr">मुख्य वैशिष्ट्ये</th>
              </tr>
            </thead>
            <tbody>
              {data.manuscripts.map((item) => (
                <tr key={item.id} className="reveal-item">
                  <td className="lang-en">
                    <strong>{item.title}</strong>
                    <br />
                    <small>{item.type}</small>
                  </td>
                  <td className="lang-mr">
                    <strong>{item.title}</strong>
                    <br />
                    <small>{item.type}</small>
                  </td>
                  <td className="lang-en">{item.period}</td>
                  <td className="lang-mr">{item.period}</td>
                  <td className="lang-en">{item.language}</td>
                  <td className="lang-mr">{item.language}</td>
                  <td className="lang-en">{item.highlightsEn}</td>
                  <td className="lang-mr">{item.highlightsMr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="stories" className="stories section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Narrative Archive</p>
          <p className="section-tag lang-mr">कथा संग्रह</p>
          <h2 className="lang-en">Story Vault and Sacred Episodes</h2>
          <h2 className="lang-mr">पवित्र आख्यायिका आणि कथा-वाटिका</h2>
        </div>

        <div className="story-grid">
          {data.storyVault.map((story) => (
            <article key={story.id} className="story-card reveal-item">
              <span className="story-type">{story.type}</span>
              <h3 className="lang-en">{story.titleEn}</h3>
              <h3 className="lang-mr">{story.titleMr}</h3>
              <p className="lang-en">{story.summaryEn}</p>
              <p className="lang-mr">{story.summaryMr}</p>
              <small>{story.eraHint}</small>
              <div className="story-symbols">
                {story.symbols.map((symbol) => (
                  <span key={symbol} className="symbol-chip">
                    {symbol}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <article className="panel sword-panel" id="khanda42">
          <div className="sword-visual-wrap">
            <img src="/assets/svg/khanda-icon.svg" alt="Khanda sword icon" className="khanda-spin" />
          </div>
          <div>
            <h3 className="lang-en">42-kg Khanda: How is it possible?</h3>
            <h3 className="lang-mr">४२ किलो खंडा: हे कसे शक्य होते?</h3>
            <p className="lang-en">
              In Jejuri oral lore and local reporting, a heavy ritual sword challenge (often cited
              near 42 kg) appears during Dussehra-season martial worship. Historically, this should
              be read as symbolic-ritual performance, practiced technique, and devotional discipline
              rather than a routine battlefield weapon standard.
            </p>
            <p className="lang-mr">
              जेजुरीच्या लोकस्मृतीत आणि काही वृत्तसंदर्भात दसऱ्याच्या सुमारास जड विधी-खंडा
              उचलण्याची परंपरा (सुमारे ४२ किलो असा उल्लेख) आढळते. याकडे नियमित युद्धास्त्रापेक्षा
              प्रतीकात्मक विधी, सराव आणि भक्ती-शिस्त म्हणून पाहणे अधिक योग्य ठरते.
            </p>
            <p className="lang-en">
              Traditional explanation: in sacred memory, Khandōba's victory-form and weapon
              symbolism merged with Deccan shastra-puja culture. Jejuri became the ritual center
              where ceremonial khanda is preserved as vow-energy, not just metal weight.
            </p>
            <p className="lang-mr">
              पारंपरिक स्पष्टीकरणानुसार, खंडोबाच्या विजय-रूपाची स्मृती आणि दख्खनी शस्त्रपूजा
              परंपरा एकत्र आल्या. म्हणून जेजुरीत खंडा हा फक्त लोखंडाचा भार नसून नवस-शक्तीचे
              विधीप्रतीक म्हणून जपला जातो.
            </p>
          </div>
        </article>

        <div className="legend-dossier-grid">
          {data.storyDossiers.map((item) => (
            <article key={item.id} className="panel ornate legend-card reveal-item">
              <h3 className="lang-en">{item.titleEn}</h3>
              <h3 className="lang-mr">{item.titleMr}</h3>
              <p className="lang-en">{item.summaryEn}</p>
              <p className="lang-mr">{item.summaryMr}</p>

              <h4 className="lang-en">Major Tradition Streams</h4>
              <h4 className="lang-mr">मुख्य परंपरा प्रवाह</h4>

              <ul className="legend-list lang-en">
                {item.versionsEn.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
              <ul className="legend-list lang-mr">
                {item.versionsMr.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>

              <p className="legend-meaning lang-en">{item.meaningEn}</p>
              <p className="legend-meaning lang-mr">{item.meaningMr}</p>
              <p className="legend-caution lang-en">{item.cautionEn}</p>
              <p className="legend-caution lang-mr">{item.cautionMr}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="meals" className="meals section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Food & Offering Culture</p>
          <p className="section-tag lang-mr">भोजन आणि नैवेद्य परंपरा</p>
          <h2 className="lang-en">Meals, Naivedya, and Community Feasts</h2>
          <h2 className="lang-mr">जेवण, नैवेद्य आणि सामुदायिक अन्नदान</h2>
        </div>

        <div className="table-wrap ornate">
          <table className="data-table" aria-label="Ritual meal table">
            <thead>
              <tr>
                <th className="lang-en">Offering</th>
                <th className="lang-mr">नैवेद्य</th>
                <th className="lang-en">Category</th>
                <th className="lang-mr">प्रकार</th>
                <th className="lang-en">Context</th>
                <th className="lang-mr">पार्श्वभूमी</th>
                <th className="lang-en">Region</th>
                <th className="lang-mr">प्रदेश</th>
              </tr>
            </thead>
            <tbody>
              {data.ritualMeals.map((meal) => (
                <tr key={meal.id} className="reveal-item">
                  <td className="lang-en">
                    <strong>{meal.dishEn}</strong>
                  </td>
                  <td className="lang-mr">
                    <strong>{meal.dishMr}</strong>
                  </td>
                  <td className="lang-en">{meal.category}</td>
                  <td className="lang-mr">{meal.category}</td>
                  <td className="lang-en">{meal.contextEn}</td>
                  <td className="lang-mr">{meal.contextMr}</td>
                  <td className="lang-en">{meal.region}</td>
                  <td className="lang-mr">{meal.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="songs" className="songs section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Bhakti Music</p>
          <p className="section-tag lang-mr">भक्तिगीत</p>
          <h2 className="lang-en">Marathi + English Songbook</h2>
          <h2 className="lang-mr">मराठी + इंग्रजी गीतसंग्रह</h2>
        </div>

        <div className="song-note panel glowing">
          <p className="lang-en">
            These verses are newly composed for this website to avoid copyright issues while
            preserving devotional flavor.
          </p>
          <p className="lang-mr">
            कॉपीराइट अडचणी टाळण्यासाठी आणि भक्तिभाव राखण्यासाठी ही गीते या वेबसाईटसाठी नव्याने
            रचली आहेत.
          </p>
        </div>

        <div className="song-grid">
          {data.songs.map((song) => (
            <article key={song.id} className="song-card reveal-item">
              <h3 className="lang-en">{song.titleEn}</h3>
              <h3 className="lang-mr">{song.titleMr}</h3>
              <p className="song-origin">{song.origin}</p>

              <div className="lyrics-wrap">
                <div className="lyrics-col">
                  <h4 className="lang-en">Marathi</h4>
                  <h4 className="lang-mr">मराठी</h4>
                  {song.marathi.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="lyrics-col">
                  <h4 className="lang-en">English Translation</h4>
                  <h4 className="lang-mr">इंग्रजी अर्थ</h4>
                  {song.english.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="series" className="series section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Screen Legacy</p>
          <p className="section-tag lang-mr">पडद्यावरील वारसा</p>
          <h2 className="lang-en">Jai Malhar Series Archive</h2>
          <h2 className="lang-mr">जय मल्हार मालिका संग्रह</h2>
        </div>

        <div className="series-brand panel ornate">
          <img src="/assets/svg/jai-malhar-logo.svg" alt="Jai Malhar logo style" className="series-logo" />
          <p className="lang-en">
            Visual style updated using the Jai Malhar yellow-tilak title aesthetic you requested.
          </p>
          <p className="lang-mr">
            तुमच्या सूचनेनुसार जय मल्हारच्या पिवळ्या-टिळा शीर्षक-शैलीत दृश्यरचना अद्ययावत केली आहे.
          </p>
        </div>

        <div className="series-layout">
          <article className="panel ornate">
            <h3 className="lang-en">Series Overview</h3>
            <h3 className="lang-mr">मालिका परिचय</h3>
            <p className="lang-en">{data.jaiMalharSeries.overviewEn}</p>
            <p className="lang-mr">{data.jaiMalharSeries.overviewMr}</p>
          </article>

          <article className="panel ornate">
            <h3 className="lang-en">Cast Highlights</h3>
            <h3 className="lang-mr">मुख्य कलाकार</h3>
            <ul className="cast-list">
              {data.jaiMalharSeries.castHighlights.map((entry) => (
                <li key={entry.role}>
                  <strong>{entry.role}:</strong> <span>{entry.actor}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className="panel ornate">
          <h3 className="lang-en">Series Photo References</h3>
          <h3 className="lang-mr">मालिका फोटो संदर्भ</h3>
          <div className="series-photo-grid">
            {data.jaiMalharSeries.gallery.map((item) => (
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
          <small className="photo-rights">
            External images remain owned by their original publishers.
          </small>
        </article>

        <div className="timeline">
          {data.jaiMalharSeries.timeline.map((item) => (
            <article key={item.year} className="timeline-item reveal-item">
              <div className="timeline-year">{item.year}</div>
              <div>
                <p className="lang-en">{item.eventEn}</p>
                <p className="lang-mr">{item.eventMr}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="legacy" className="legacy section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Lineage & Patron Note</p>
          <p className="section-tag lang-mr">वंशपरंपरा आणि संरक्षक नोंद</p>
          <h2 className="lang-en">Family-Submitted Legacy Entry</h2>
          <h2 className="lang-mr">कुटुंबाकडून सादर वंशपरंपरा नोंद</h2>
        </div>

        <article className="panel glowing">
          <h3 className="lang-en">{data.familyLegacy.headingEn}</h3>
          <h3 className="lang-mr">{data.familyLegacy.headingMr}</h3>
          <p className="lang-en">{data.familyLegacy.statementEn}</p>
          <p className="lang-mr">{data.familyLegacy.statementMr}</p>
          <p className="legacy-caution">{data.familyLegacy.caution}</p>
        </article>

        <article className="panel ornate">
          <h3 className="lang-en">{data.familyLegacy.kulDaivatHeadingEn}</h3>
          <h3 className="lang-mr">{data.familyLegacy.kulDaivatHeadingMr}</h3>
          <ul className="kul-list lang-en">
            {data.familyLegacy.kulDaivatsEn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="kul-list lang-mr">
            {data.familyLegacy.kulDaivatsMr.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <div className="glossary-wrap">
          <h3 className="lang-en">Glossary</h3>
          <h3 className="lang-mr">शब्दकोश</h3>
          <div className="glossary-grid">
            {data.glossary.map((entry) => (
              <article key={entry.word} className="glossary-card reveal-item">
                <h4>{entry.word}</h4>
                <p className="lang-en">{entry.en}</p>
                <p className="lang-mr">{entry.mr}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sources" className="sources section-frame">
        <div className="section-head">
          <p className="section-tag lang-en">Research Trail</p>
          <p className="section-tag lang-mr">संशोधन स्रोत</p>
          <h2 className="lang-en">Sources and References</h2>
          <h2 className="lang-mr">स्रोत आणि संदर्भ</h2>
        </div>

        <div className="panel">
          <p className="lang-en">
            Use these links to verify historical, devotional, and media references used in this
            project.
          </p>
          <p className="lang-mr">
            या प्रकल्पात वापरलेल्या ऐतिहासिक, भक्तिपर आणि माध्यम संदर्भांची पडताळणी करण्यासाठी
            खालील दुवे वापरा.
          </p>
        </div>

        <ol className="source-list">
          {data.sources.map((source) => (
            <li key={source.id} className="reveal-item">
              <strong>{source.label}</strong> ({source.type}) -{" "}
              <a href={source.link} target="_blank" rel="noopener noreferrer">
                {source.link}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
