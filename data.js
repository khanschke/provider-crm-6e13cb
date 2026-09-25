/* Provider CRM microsite data — ported verbatim from the Salesforce org LWC bundle. */
(function(){
/**
 * Shared demo dataset for the Provider CRM prototype.
 * Mirrors the Figma wireframe data so every screen stays consistent.
 * (Prototype fidelity: data is embedded rather than sourced from objects.)
 */

const MARKET_LABEL = 'Southeast Market';

const PROVIDERS = [
    {
        id: 'piedmont-system',
        name: 'Piedmont Healthcare System',
        npi: '1902837465',
        type: 'Multi-Specialty Health System',
        specialty: 'Multi-Specialty',
        market: 'Georgia',
        state: 'GA',
        owner: { name: 'Sarah Chen', role: 'PEX', initials: 'SC', color: '#2e844a' },
        priority: 'High',
        members: { total: 2145, mc: 1822, md: 323 },
        engagement: 3,
        stars: 3.8,
        cases: 2,
        actionPlans: 6,
        lastEngagement: { date: 'Jun 30, 2026', ago: '79d ago' },
        contract: 'Active'
    },
    {
        id: 'emory',
        name: 'Emory Healthcare',
        npi: '1564738291',
        type: 'Academic Medical Center',
        specialty: 'Multi-Specialty',
        market: 'Georgia',
        state: 'GA',
        owner: { name: 'Sarah Chen', role: 'PEX', initials: 'SC', color: '#2e844a' },
        priority: 'High',
        members: { total: 2480, mc: 2320, md: 160 },
        engagement: 3,
        stars: 4.1,
        cases: 0,
        actionPlans: 3,
        lastEngagement: { date: 'Jun 30, 2026', ago: '79d ago' },
        contract: 'Active'
    },
    {
        id: 'advocate-atrium',
        name: 'Advocate Health / Atrium Health',
        npi: '1748392015',
        type: 'Multi-Specialty Health System',
        specialty: 'Multi-Specialty',
        market: 'Carolinas',
        state: 'NC',
        owner: { name: 'David Park', role: 'PEX', initials: 'DP', color: '#0b6b3a' },
        priority: 'High',
        members: { total: 2000, mc: 1620, md: 380 },
        engagement: 3,
        stars: 3.9,
        cases: 3,
        actionPlans: 8,
        lastEngagement: { date: 'Jun 30, 2026', ago: '79d ago' },
        contract: 'Active'
    },
    {
        id: 'novant-ballantyne',
        name: 'Novant Health Primary Care \u2013 Ballantyne',
        npi: '1765432109',
        type: 'Primary Care',
        specialty: 'Primary Care',
        market: 'North Carolina',
        state: 'NC',
        owner: { name: 'James Whitfield', role: 'NPP', initials: 'JW', color: '#7b3ff2' },
        priority: 'Medium',
        members: { total: 1450, mc: 1200, md: 250 },
        engagement: 2,
        stars: 3.8,
        cases: 1,
        actionPlans: 3,
        lastEngagement: { date: 'Jul 13, 2026', ago: '66d ago' },
        contract: 'Active'
    },
    {
        id: 'wakemed',
        name: 'WakeMed Hospitalists',
        npi: '1543210987',
        type: 'Hospital Medicine',
        specialty: 'Hospital Medicine',
        market: 'North Carolina',
        state: 'NC',
        owner: { name: 'Dana Osei', role: 'PEX', initials: 'DO', color: '#2e844a' },
        priority: 'Medium',
        members: { total: 980, mc: 790, md: 190 },
        engagement: 2,
        stars: 3.2,
        cases: 1,
        actionPlans: 2,
        lastEngagement: { date: 'Jul 21, 2026', ago: '58d ago' },
        contract: 'Active'
    },
    {
        id: 'bon-secours',
        name: 'Bon Secours Medical Group \u2013 Virginia',
        npi: '1432109876',
        type: 'Multi-Specialty',
        specialty: 'Multi-Specialty',
        market: 'Virginia',
        state: 'VA',
        owner: { name: 'Dana Osei', role: 'PEX', initials: 'DO', color: '#2e844a' },
        priority: 'Low',
        members: { total: 1120, mc: 940, md: 180 },
        engagement: 1,
        stars: 3.6,
        cases: 0,
        actionPlans: 2,
        lastEngagement: { date: 'Jul 31, 2026', ago: '48d ago' },
        contract: 'Active'
    }
];

function getProvider(id) {
    return PROVIDERS.find((p) => p.id === id);
}

/** Star color band shared across screens. */
function starTone(stars) {
    if (stars >= 3.5) return 'good';
    if (stars >= 3.0) return 'warn';
    return 'bad';
}

/**
 * Rich per-provider detail used by the Provider Detail workspace.
 * The hero account (Novant) and Piedmont are authored to match the
 * wireframe; other accounts fall back to values derived from base data.
 */
const DETAIL_OVERRIDES = {
    'novant-ballantyne': {
        badges: ['IDN', 'NSP'],
        emr: 'Epic',
        accountOwner: 'James Whitfield (NPP)',
        nextMeeting: '2026-09-22',
        profile: {
            taxId: '56-7654321',
            phone: '(704) 316-3000',
            website: 'www.novanthealth.org/primary-care',
            address: '15525 Ballantyne Medical Pl, Charlotte, NC 28277',
            networkStatus: 'Active',
            programs: ['PPCM', 'POCA'],
            designations: ['IDN', 'NSP'],
            sdf: true,
            attestation: true
        },
        hierarchy: ['Novant Health', 'Medical Group', 'Primary Care \u2013 Ballantyne'],
        dris: [
            { role: 'MRA', name: 'Tanisha Brown', email: 'tbrown@humana.com', initials: 'TB' },
            { role: 'Contracting', name: 'Robert Kim', email: 'rkim@humana.com', initials: 'RK' },
            { role: 'Provider Services', name: 'Carl Monroe', email: 'cmonroe@humana.com', initials: 'CM' }
        ],
        snapshot: { openActions: 3, overdueActions: 0, pendingCommitments: 2, interop: '3 / 23' },
        nextMeetingPretty: 'Sep 21, 2026',
        nextMeetingIn: 'in 4 days',
        aiSummary: 'Based on 2 team notes over the past 30 days: Epic FHIR partially enabled.',
        aiTags: ['Med Adherence', 'Stars', 'Interop', 'FHIR'],
        performance: {
            openGaps: 198,
            gapsClosedYtd: 167,
            closureRate: '46%',
            admitsPer1k: 275,
            edRate: '16.8%',
            avoidableCare: '9.4%',
            gaps: [
                { name: 'Medication Adherence \u2013 Diabetes Meds', kind: 'Data Gap', from: '79%', to: '85%', open: '~87 open gaps' },
                { name: 'Controlling Blood Pressure', kind: 'Care Gap', from: '71%', to: '80%', open: '~131 open gaps' }
            ]
        },
        interop: {
            vendor: 'Epic Systems',
            version: 'Epic 2023 (Quilt)',
            portal: 'MyChart',
            itContact: { name: 'Pam Reeves', email: 'preeves@novanthealth.org' },
            standards: [
                { name: 'FHIR', detail: 'FHIR R4' },
                { name: 'HL7', detail: 'HL7 v2.3' },
                { name: 'CCDA', detail: 'CCDA 2.1' }
            ],
            note: 'FHIR partially enabled. Medication adherence and lab result feeds are a near-term opportunity via MedicationRequest and Observation FHIR resources.'
        },
        contract: {
            parts: 'A/B',
            fee: '$12.00 PMPM',
            contractor: 'Robert Kim',
            expiry: 'Mar 30, 2028',
            loadStatus: 'Active \u2013 Last loaded 8/3/2026',
            renewalDays: '560d',
            tin: '56-7654321'
        },
        casesList: [
            {
                ref: 'SC-2026-44990',
                type: 'Provider Data',
                status: 'In Progress',
                priority: 'Medium',
                summary: 'Two physicians (Dr. Chen, Dr. Patel) not appearing in Humana provider directory despite being in-network.',
                queue: 'Provider Data Management',
                submitted: 'Jul 19, 2026',
                age: '23 days'
            }
        ],
        actionItems: [
            { tag: 'Share Resource', title: 'Share Pharmacy Partnership Info', status: 'Not Started', priority: 'Medium', desc: 'Provide information on Humana pharmacy adherence programs', owner: 'James Whitfield', due: 'Aug 14, 2026', cat: 'Performance' },
            { tag: 'Issue Follow-Up', title: 'Follow Up on Directory Correction', status: 'In Progress', priority: 'Medium', desc: 'Track SC-2026-44990 resolution and confirm directory update', owner: 'James Whitfield', due: 'Aug 4, 2026', cat: 'Issue Resolution' },
            { tag: 'Education / Training', title: 'Schedule BP Improvement Workshop', status: 'Not Started', priority: 'Medium', desc: 'Organize clinical education session on hypertension management', owner: 'James Whitfield', due: 'Sep 14, 2026', cat: 'Performance' }
        ],
        engagements: [
            {
                title: 'Mid-year performance review',
                meta: 'Jul 13, 2026 \u00b7 Meeting \u00b7 3 attendees',
                attendees: ['James Whitfield (NPP)', 'Dr. Angela Morrison', 'Brian Kessler'],
                notes: 'Medication adherence gaps discussed. Provider interested in pharmacy partnership opportunities. Blood pressure control improving but still below target.',
                commitments: ['James to share pharmacy partnership information', 'Provider to explore automated refill reminder workflows'],
                outcomes: ['Adherence improvement plan discussed']
            }
        ]
    },
    'piedmont-system': {
        badges: ['IDN'],
        emr: 'Epic',
        nonStdContract: true,
        accountOwner: 'Sarah Chen (PEX)',
        nextMeeting: '2026-09-18',
        profile: {
            taxId: '58-1234567',
            phone: '(404) 605-5000',
            website: 'www.piedmont.org',
            address: '1968 Peachtree Rd NW, Atlanta, GA 30309',
            networkStatus: 'Active',
            programs: ['PPCM'],
            designations: ['IDN', 'NSP'],
            sdf: true,
            attestation: false
        },
        hierarchy: ['Piedmont Healthcare', 'Piedmont Heart Institute'],
        dris: [
            { role: 'MRA', name: 'Tanisha Brown', email: 'tbrown@humana.com', initials: 'TB' },
            { role: 'Contracting', name: 'Maria Delgado', email: 'mdelgado@humana.com', initials: 'MD' }
        ],
        snapshot: { openActions: 4, overdueActions: 1, pendingCommitments: 2, interop: '3 / 23' },
        nextMeetingPretty: 'Sep 17, 2026',
        nextMeetingIn: 'in 0 days',
        aiSummary: 'Based on 4 team notes over the past 30 days: Redoc rate holding at 68% for this group. Epic environment confirmed as FHIR R4 capable.',
        aiTags: ['Stars', 'HbA1c', 'MRA', 'Redoc'],
        contract: {
            parts: 'A/B',
            fee: '$12.50 PMPM',
            contractor: 'Maria Delgado',
            expiry: 'Dec 30, 2027',
            loadStatus: 'Active \u2013 Last loaded 8/1/2026',
            renewalDays: '470d',
            tin: '58-1234567',
            warning: 'Non-standard contract language present \u2014 review before renewal'
        }
    }
};

function genericDetail(p) {
    return {
        badges: ['IDN'],
        emr: 'Epic',
        accountOwner: `${p.owner.name} (${p.owner.role})`,
        nextMeeting: '2026-09-30',
        profile: {
            taxId: '00-0000000',
            phone: '(000) 000-0000',
            website: 'www.example.org',
            address: `${p.market}, USA`,
            networkStatus: 'Active',
            programs: ['PPCM'],
            designations: ['IDN'],
            sdf: true,
            attestation: true
        },
        hierarchy: [p.name],
        dris: [
            { role: 'MRA', name: 'Tanisha Brown', email: 'tbrown@humana.com', initials: 'TB' },
            { role: 'Contracting', name: 'Robert Kim', email: 'rkim@humana.com', initials: 'RK' }
        ],
        snapshot: { openActions: p.actionPlans, overdueActions: 0, pendingCommitments: 1, interop: '2 / 23' },
        nextMeetingPretty: 'Sep 30, 2026',
        nextMeetingIn: 'upcoming',
        aiSummary: `Based on recent team notes for ${p.name}: engagement steady; monitoring Stars performance.`,
        aiTags: ['Stars', 'Engagement'],
        performance: (function () {
            const r = BOOK_OF_BUSINESS.rows.find((x) => x.pid === p.id);
            const s = p.stars;
            return {
                openGaps: Math.round((5 - s) * 90),
                gapsClosedYtd: Math.round(s * 45),
                closureRate: Math.round(28 + s * 9) + '%',
                admitsPer1k: r ? Math.round(parseFloat(r.acute)) : Math.round((5 - s) * 70),
                edRate: r ? r.er + ' / 1K' : Math.round((5 - s) * 160) + ' / 1K',
                avoidableCare: (Math.round((5 - s) * 40) / 10) + '%',
                gaps: [
                    { name: 'HEDIS Composite Measures', kind: 'Care Gap', from: r ? Math.round(parseFloat(r.hedis) / 5 * 100) + '%' : Math.round(s / 5 * 100) + '%', to: '80%', open: '~' + Math.round((5 - s) * 40) + ' open gaps' },
                    { name: 'Annual Wellness Visits', kind: 'Data Gap', from: r ? r.aw : '40%', to: '60%', open: '~' + Math.round((5 - s) * 30) + ' open gaps' }
                ]
            };
        })(),
        interop: {
            vendor: 'Epic Systems',
            version: 'Epic 2023 (Quilt)',
            portal: 'MyChart',
            itContact: { name: 'IT Service Desk', email: 'it@' + (p.name.toLowerCase().replace(/[^a-z]+/g, '') || 'provider') + '.org' },
            standards: [
                { name: 'FHIR', detail: 'FHIR R4' },
                { name: 'HL7', detail: 'HL7 v2.3' },
                { name: 'CCDA', detail: 'CCDA 2.1' }
            ],
            note: 'Epic environment confirmed as FHIR R4 capable. Medication adherence and lab result feeds represent near-term interoperability opportunities via MedicationRequest and Observation FHIR resources.'
        },
        engagements: [
            {
                title: 'Quarterly business review',
                meta: p.lastEngagement.date + ' \u00b7 Meeting \u00b7 2 attendees',
                attendees: [p.owner.name + ' (' + p.owner.role + ')', 'Provider Relations Lead'],
                notes: 'Reviewed Stars performance, open gaps, and engagement priorities for ' + p.name + '. Provider aligned on next-quarter focus areas including preventive visits and medication adherence.',
                commitments: ['Share updated open gap list', 'Schedule follow-up on top-priority measures'],
                outcomes: ['Confirmed focus on medication adherence and preventive care']
            }
        ],
        contract: {
            parts: 'A/B',
            fee: '$11.50 PMPM',
            contractor: p.owner.name,
            expiry: 'Jun 30, 2027',
            loadStatus: 'Active \u2013 Last loaded 8/1/2026',
            renewalDays: '320d',
            tin: p.npi.slice(0, 2) + '-' + p.npi.slice(2, 9)
        }
    };
}

function routeFor(type) {
    const m = { 'Claims Processing': 'Claims Operations', 'Prior Authorization': 'Medical Management', 'Network Directory': 'Provider Data Management', 'Provider Data': 'Provider Data Management' };
    return m[type] || 'Provider Services';
}
function ageToDate(age) {
    const days = parseInt(age, 10) || 0;
    const base = new Date(2026, 8, 25);
    base.setDate(base.getDate() - days);
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return m[base.getMonth()] + ' ' + base.getDate() + ', ' + base.getFullYear();
}
function prettyDate(iso) {
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const p = String(iso).split('-');
    return p.length === 3 ? m[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0] : iso;
}
function deriveCases(pid) {
    return CASES.filter((c) => c.pid === pid).map((c) => ({
        ref: c.ref, type: c.type, status: c.status, priority: c.priority, summary: c.summary,
        queue: routeFor(c.type), submitted: ageToDate(c.age), age: c.age.replace(/d$/, ' days')
    }));
}
function deriveActionItems(p) {
    const items = [];
    ACTION_PLAN_GROUPS.filter((g) => g.pid === p.id).forEach((g) => g.plans.forEach((pl) => items.push({
        tag: pl.category, title: pl.title, status: pl.status, priority: p.priority,
        desc: pl.desc, owner: pl.owner, due: prettyDate(pl.due), cat: pl.category,
        progress: pl.progress, milestones: pl.milestones
    })));
    return items;
}

function getDetail(id) {
    const p = getProvider(id) || PROVIDERS[0];
    const base = genericDetail(p);
    const override = DETAIL_OVERRIDES[p.id] || {};
    const detail = { provider: p, ...base, ...override };
    if (!detail.casesList) detail.casesList = deriveCases(p.id);
    if (!detail.actionItems) detail.actionItems = deriveActionItems(p);
    return detail;
}

/* =====================================================================
 * MY CASES
 * ===================================================================== */
const CASES = [
    {
        ref: 'SC-2026-44821',
        pid: 'piedmont-system',
        summary: 'Provider reporting delays in claims adjudication for cardiology procedure codes 93458-93461. Average delay exceeding 45 days.',
        sub: 'Escalated to Claims Ops on 7/18. Estimated resolution 8/20.',
        provider: 'Piedmont Heart Institute',
        market: 'Georgia',
        type: 'Claims Processing',
        priority: 'High',
        status: 'In Progress',
        age: '29d'
    },
    {
        ref: 'SC-2026-46104',
        pid: 'piedmont-system',
        summary: 'Cardiology diagnostic imaging PA requests showing higher than expected denial rate (38%). Provider requesting review.',
        sub: 'Routed to Medical Management for review.',
        provider: 'Piedmont Heart Institute',
        market: 'Georgia',
        type: 'Prior Authorization',
        priority: 'Medium',
        status: 'Open',
        age: '13d'
    },
    {
        ref: 'SC-2026-43011',
        pid: 'advocate-atrium',
        summary: 'Provider listing incorrect in online directory \u2014 showing old address and missing two physicians from the group.',
        sub: 'Routed to Provider Data Management for correction.',
        provider: 'Atrium Health Gastroenterology',
        market: 'North Carolina',
        type: 'Network Directory',
        priority: 'Medium',
        status: 'Open',
        age: '43d'
    },
    {
        ref: 'SC-2026-45227',
        pid: 'advocate-atrium',
        summary: 'Colonoscopy claims (CPT 45378) being denied incorrectly as non-covered. Provider reports 22 affected claims since June.',
        sub: 'Under review.',
        provider: 'Atrium Health Gastroenterology',
        market: 'North Carolina',
        type: 'Claims Processing',
        priority: 'High',
        status: 'Open',
        age: '22d'
    },
    {
        ref: 'SC-2026-44102',
        pid: 'advocate-atrium',
        summary: 'PA turnaround times for GI procedures exceeding 5 business days. Provider requesting expedited review.',
        sub: 'Medical Management reviewing PA workflow.',
        provider: 'Atrium Health Gastroenterology',
        market: 'North Carolina',
        type: 'Prior Authorization',
        priority: 'Medium',
        status: 'In Progress',
        age: '34d'
    },
    {
        ref: 'SC-2026-44990',
        pid: 'novant-ballantyne',
        summary: 'Two physicians (Dr. Chen, Dr. Patel) not appearing in Humana provider directory despite being in-network.',
        sub: 'Under correction.',
        provider: 'Novant Health Primary Care \u2013 Ballantyne',
        market: 'North Carolina',
        type: 'Provider Data',
        priority: 'Medium',
        status: 'In Progress',
        age: '23d'
    },
    {
        ref: 'SC-2026-45501',
        pid: 'wakemed',
        summary: 'Hospital medicine consult claims showing inconsistent bundling \u2014 some being denied as duplicate.',
        sub: 'Under review.',
        provider: 'WakeMed Hospitalists',
        market: 'North Carolina',
        type: 'Claims Processing',
        priority: 'Medium',
        status: 'Open',
        age: '19d'
    }
];

/* =====================================================================
 * MY ACTION PLANS  (grouped by provider entity)
 * ===================================================================== */
const ACTION_PLAN_GROUPS = [
    {
        group: 'Piedmont Heart Institute',
        pid: 'piedmont-system',
        plans: [
            {
                title: 'MY2025 Stars Improvement Plan',
                status: 'Active',
                category: 'Performance',
                desc: 'Improve Piedmont Heart Institute Stars score from 3.2 to 3.8 by end of MY2025 measurement year through targeted gap closure in HbA1c control and colorectal screening.',
                progress: 35,
                milestones: '1/5 milestones',
                owner: 'Sarah Chen',
                due: '2026-12-31'
            },
            {
                title: 'Prior Auth Delay Resolution Plan',
                status: 'Active',
                category: 'Quality',
                desc: 'Resolve systemic prior authorization delays affecting cardiology procedures within 60 days, reducing provider escalations to zero.',
                progress: 20,
                milestones: '0/4 milestones',
                owner: 'Carl Monroe',
                due: '2026-09-30'
            }
        ]
    },
    {
        group: 'Emory Healthcare \u2013 Primary Care Network',
        pid: 'emory',
        plans: [
            {
                title: 'AWV & Preventive Care Acceleration',
                status: 'Active',
                category: 'Performance',
                desc: 'Increase Annual Wellness Visit completion rate from 89% to 92% and close remaining RASA medication adherence gaps before MY2025 measurement close.',
                progress: 50,
                milestones: '1/4 milestones',
                owner: 'Sarah Chen',
                due: '2026-11-30'
            }
        ]
    },
    {
        group: 'Atrium Health Gastroenterology',
        pid: 'advocate-atrium',
        plans: [
            {
                title: 'Colorectal Screening Gap Closure Plan',
                status: 'Active',
                category: 'Performance',
                desc: 'Close 120 open colorectal cancer screening gaps across the Atrium GI panel by Q4 2026, moving the measure score from 52% to at least 68%.',
                progress: 15,
                milestones: '1/5 milestones',
                owner: 'David Park',
                due: '2026-12-15'
            },
            {
                title: 'Contract Renewal Preparation',
                status: 'Active',
                category: 'Contracting',
                desc: 'Complete all pre-renewal documentation, resolve colonoscopy denial issue, and present updated fee schedule proposal by 10/1/2026.',
                progress: 10,
                milestones: '0/4 milestones',
                owner: 'David Park',
                due: '2026-10-01'
            }
        ]
    }
];

/* =====================================================================
 * BOOK OF BUSINESS  (Tax ID view)
 * ===================================================================== */
const BOOK_OF_BUSINESS = {
    meta: {
        subtitle: 'Southeast Market \u00b7 Tax ID View \u00b7 6 providers \u00b7 7,740 total patients \u00b7 Click any row to open account',
        refreshed: 'Data Last Refreshed: Jun 11, 2026',
        frequency: 'Refresh Frequency: Monthly',
        sources: 'Anvita \u00b7 Verscend \u00b7 Pharmacy Analytics \u00b7 EDP MRA \u00b7 EDW'
    },
    kpis: [
        { label: 'Providers', value: '6', tone: 'brand' },
        { label: 'Book Avg Stars', value: '3.50', tone: 'plain' },
        { label: 'Providers \u2265 4.0 Stars', value: '1', tone: 'green' },
        { label: 'Providers < 3.0 Stars', value: '1', tone: 'red' },
        { label: 'Level 3 Engagement', value: '4', tone: 'green' },
        { label: 'High ER Utilization', value: '2', tone: 'red' }
    ],
    distribution: [
        { label: '\u2265 4.0 \u2605', count: 1, tone: 'green' },
        { label: '3.5-3.9 \u2605', count: 2, tone: 'green' },
        { label: '3.0-3.4 \u2605', count: 2, tone: 'amber' },
        { label: '< 3.0 \u2605', count: 1, tone: 'red' }
    ],
    averages: [
        { label: 'Avg PCP Visit', value: '75%' },
        { label: 'Avg AW Visit', value: '37%' },
        { label: 'Avg ER/1K', value: '498' }
    ],
    bookRow: {
        name: 'Book Performance',
        patients: '7,740', overall: '3.50', hedis: '2.88', ptSafety: '4.43', pe: '84.0%',
        pcp: '75%', aw: '37%', redoc: '70%', acute: '161.0', er: '497.5', cwmor: '28.3%',
        totalmor: '29.0%', gdr: '91.4%', level: '', lastContact: ''
    },
    rows: [
        { pid: 'emory', name: 'Emory Healthcare \u2013 Primary Care Network', sub: 'Primary Care \u00b7 Georgia',
          patients: '2,104', overall: '4.10', hedis: '3.82', ptSafety: '4.83', pe: '91.33%', pcp: '88%', aw: '61%',
          redoc: '78%', acute: '89.4', er: '312.6', cwmor: '34.2%', totalmor: '34.8%', gdr: '93.5%', level: 'Level 3', lastContact: 'Aug 5, 2026' },
        { pid: 'novant-ballantyne', name: 'Novant Health Primary Care \u2013 Ballantyne', sub: 'Primary Care \u00b7 North Carolina',
          patients: '1,451', overall: '3.80', hedis: '3.21', ptSafety: '4.50', pe: '88.17%', pcp: '81%', aw: '47%',
          redoc: '74%', acute: '104.1', er: '398.9', cwmor: '31.7%', totalmor: '32.4%', gdr: '92.8%', level: 'Level 2', lastContact: 'Jul 14, 2026' },
        { pid: 'bon-secours', name: 'Bon Secours Medical Group \u2013 Virginia', sub: 'Multi-Specialty \u00b7 Virginia',
          patients: '1,783', overall: '3.60', hedis: '3.04', ptSafety: '4.66', pe: '85.09%', pcp: '78%', aw: '43%',
          redoc: '72%', acute: '118.5', er: '421.7', cwmor: '29.8%', totalmor: '30.5%', gdr: '91.9%', level: 'Level 3', lastContact: 'Aug 1, 2026' },
        { pid: 'piedmont-system', name: 'Piedmont Heart Institute', sub: 'Cardiology \u00b7 Georgia',
          patients: '847', overall: '3.40', hedis: '2.83', ptSafety: '4.16', pe: '86.04%', pcp: '72%', aw: '38%',
          redoc: '71%', acute: '142.3', er: '487.2', cwmor: '28.4%', totalmor: '29.1%', gdr: '91.2%', level: 'Level 3', lastContact: 'Jul 28, 2026' },
        { pid: 'wakemed', name: 'WakeMed Hospitalists', sub: 'Hospital Medicine \u00b7 North Carolina',
          patients: '937', overall: '3.20', hedis: '2.41', ptSafety: '4.58', pe: '79.36%', pcp: '69%', aw: '21%',
          redoc: '65%', acute: '312.8', er: '641.3', cwmor: '24.6%', totalmor: '25.1%', gdr: '90.4%', level: 'Level 3', lastContact: 'Jul 22, 2026' },
        { pid: 'advocate-atrium', name: 'Atrium Health Gastroenterology', sub: 'Gastroenterology \u00b7 North Carolina',
          patients: '618', overall: '2.90', hedis: '1.94', ptSafety: '3.83', pe: '74.21%', pcp: '61%', aw: '14%',
          redoc: '58%', acute: '198.7', er: '723.4', cwmor: '21.3%', totalmor: '21.9%', gdr: '88.6%', level: 'Level 2', lastContact: 'Jun 18, 2026' }
    ]
};

/* =====================================================================
 * COVERAGE MAP
 * ===================================================================== */
const COVERAGE = {
    kpis: [
        { label: 'Top-Level Accounts', value: '6', tone: 'plain' },
        { label: 'States with Coverage', value: '3', tone: 'plain' },
        { label: 'Cities / Markets', value: '4', tone: 'plain' },
        { label: 'Total Membership', value: '10,175', tone: 'brand' }
    ],
    states: [
        { code: 'GA', name: 'Georgia', accounts: '2 accounts', members: '4,625', mc: 'MC 4,142', md: 'MD 483' },
        { code: 'NC', name: 'North Carolina', accounts: '3 accounts', members: '4,430', mc: 'MC 3,610', md: 'MD 820' },
        { code: 'VA', name: 'Virginia', accounts: '1 account', members: '1,120', mc: 'MC 940', md: 'MD 180' }
    ],
    cities: [
        { city: 'Charlotte, NC', st: 'NC', count: '2 accts', market: 'Market: North Carolina \u00b7 James Whitfield, David Park',
          mc: 'MC 2,820', md: 'MD 630', accounts: [
            { name: 'Novant Health Primary Care \u2013 Ballantyne', pid: 'novant-ballantyne' },
            { name: 'Advocate Health / Atrium Health', pid: 'advocate-atrium' }
          ] },
        { city: 'Atlanta, GA', st: 'GA', count: '2 accts', market: 'Market: Georgia \u00b7 Sarah Chen',
          mc: 'MC 4,142', md: 'MD 483', accounts: [
            { name: 'Piedmont Healthcare System', pid: 'piedmont-system' },
            { name: 'Emory Healthcare', pid: 'emory' }
          ] },
        { city: 'Raleigh, NC', st: 'NC', count: '1 acct', market: 'Market: North Carolina \u00b7 Dana Osei',
          mc: 'MC 790', md: 'MD 190', accounts: [
            { name: 'WakeMed Hospitalists', pid: 'wakemed' }
          ] },
        { city: 'Richmond, VA', st: 'VA', count: '1 acct', market: 'Market: Virginia \u00b7 Dana Osei',
          mc: 'MC 940', md: 'MD 180', accounts: [
            { name: 'Bon Secours Medical Group \u2013 Virginia', pid: 'bon-secours' }
          ] }
    ],
    coveredStates: ['GA', 'NC', 'VA'],
    pins: [
        { label: 'Charlotte', cx: 759.8, cy: 315.6, count: 2 },
        { label: 'Raleigh', cx: 798.0, cy: 303.2, count: 1 },
        { label: 'Richmond', cx: 818.9, cy: 264.0, count: 1 },
        { label: 'Atlanta', cx: 698.4, cy: 348.5, count: 2 }
    ]
};

/* =====================================================================
 * LEADERSHIP DASHBOARD
 * ===================================================================== */
const LEADERSHIP = {
    kpis: [
        { label: 'Total Membership', value: '10,175', tone: 'brand' },
        { label: 'Book Avg Stars', value: '3.50', tone: 'plain' },
        { label: 'High-Priority Accounts', value: '3', tone: 'red' },
        { label: 'Open Cases', value: '7', tone: 'amber' },
        { label: 'Overdue Actions', value: '1', tone: 'red' },
        { label: 'At-Risk (< 3.0\u2605)', value: '1', tone: 'red' }
    ],
    trend: {
        improving: 2,
        stable: 2,
        declining: 2,
        rows: [
            { name: 'Atrium Health Gastroenterology', sub: 'Gastroenterology \u00b7 NC', value: '2.9', delta: '\u25bc 0.4', dir: 'down' },
            { name: 'WakeMed Hospitalists', sub: 'Hospital Medicine \u00b7 NC', value: '3.2', delta: '\u25bc 0.2', dir: 'down' },
            { name: 'Emory Healthcare \u2013 Primary Care', sub: 'Primary Care \u00b7 GA', value: '4.1', delta: '\u25b2 0.3', dir: 'up' },
            { name: 'Novant Health Primary Care', sub: 'Primary Care \u00b7 NC', value: '3.8', delta: '\u25b2 0.2', dir: 'up' }
        ]
    },
    priority: [
        { name: 'Atrium Health Gastroenterology', sub: '3 open issues \u00b7 3 overdue actions', pid: 'advocate-atrium', badges: ['High', 'Overdue'] },
        { name: 'Piedmont Heart Institute', sub: '2 open issues \u00b7 1 overdue action', pid: 'piedmont-system', badges: ['High', 'Overdue'] },
        { name: 'Advocate Health / Atrium Health', sub: '3 open issues', pid: 'advocate-atrium', badges: ['High'] },
        { name: 'Novant Health Primary Care', sub: '1 open issue', pid: 'novant-ballantyne', badges: ['Medium'] }
    ],
    dataHealth: {
        score: 92,
        label: 'Overall Data Completeness',
        rows: [
            { label: 'SDF on File', value: '6 / 6' },
            { label: 'Attestations Current', value: '5 / 6' },
            { label: 'Contracts Loaded', value: '6 / 6' }
        ],
        alert: '1 provider (Piedmont) has a non-standard contract flagged for review before renewal.'
    },
    membership: [
        { name: 'Emory Healthcare', value: 2480, pct: 100 },
        { name: 'Piedmont Healthcare', value: 2145, pct: 87 },
        { name: 'Advocate / Atrium', value: 2000, pct: 81 },
        { name: 'Novant Health', value: 1450, pct: 58 },
        { name: 'Bon Secours', value: 1120, pct: 45 },
        { name: 'WakeMed', value: 980, pct: 40 }
    ],
    table: [
        { pid: 'emory', name: 'Emory Healthcare', sub: 'Georgia', stars: '4.1', cases: 0, actions: 3, engagement: 'Level 3', risk: 'Low' },
        { pid: 'advocate-atrium', name: 'Advocate / Atrium Health', sub: 'North Carolina', stars: '3.9', cases: 3, actions: 8, engagement: 'Level 3', risk: 'High' },
        { pid: 'piedmont-system', name: 'Piedmont Healthcare', sub: 'Georgia', stars: '3.8', cases: 2, actions: 6, engagement: 'Level 3', risk: 'High' },
        { pid: 'novant-ballantyne', name: 'Novant Health Primary Care', sub: 'North Carolina', stars: '3.8', cases: 1, actions: 3, engagement: 'Level 2', risk: 'Medium' },
        { pid: 'bon-secours', name: 'Bon Secours Medical Group', sub: 'Virginia', stars: '3.6', cases: 0, actions: 2, engagement: 'Level 3', risk: 'Low' },
        { pid: 'wakemed', name: 'WakeMed Hospitalists', sub: 'North Carolina', stars: '3.2', cases: 1, actions: 2, engagement: 'Level 3', risk: 'Medium' }
    ]
};

/** Shared priority pill class. */
function priorityClass(priority) {
    return `pri pri-${(priority || '').toLowerCase()}`;
}

const US_MAP_VIEWBOX = '0 0 1000 541';
const US_STATES = [
    { code: 'AL', name: 'Alabama', d: 'M647.0 320.6 L677.3 321.0 L680.4 340.1 L684.6 368.3 L686.6 374.6 L688.5 378.1 L687.8 380.3 L689.8 381.6 L686.8 384.4 L686.9 387.2 L685.4 391.0 L687.1 397.7 L685.9 403.6 L687.8 409.7 L679.2 409.8 L642.8 409.8 L642.2 412.8 L646.1 417.0 L645.4 420.7 L646.8 422.5 L644.2 425.8 L641.8 426.6 L637.5 422.9 L637.0 417.4 L635.7 416.8 L634.1 420.9 L633.5 425.0 L629.0 423.9 L627.7 389.8 L631.7 347.4 L634.2 323.0 L632.4 320.7 L647.0 320.6 Z' },
    { code: 'AR', name: 'Arkansas', d: 'M523.7 287.1 L598.6 287.3 L600.1 291.5 L597.4 294.2 L594.7 298.4 L605.9 298.4 L605.3 302.5 L602.8 303.7 L602.2 307.2 L599.0 310.8 L599.2 316.2 L597.5 320.1 L595.8 320.7 L596.9 322.7 L594.1 324.4 L592.9 328.2 L591.1 329.1 L591.4 333.5 L588.2 334.8 L588.3 336.2 L584.7 339.9 L585.8 342.3 L582.6 345.9 L579.9 352.7 L582.9 355.6 L581.4 357.5 L582.4 362.1 L581.0 365.2 L538.7 364.8 L531.2 364.8 L531.2 352.9 L528.7 352.0 L525.3 353.1 L523.5 351.0 L524.5 311.8 L521.3 287.1 L523.7 287.1 Z' },
    { code: 'AZ', name: 'Arizona', d: 'M271.3 276.0 L271.3 402.4 L236.1 402.4 L215.8 394.1 L171.3 376.5 L173.0 371.5 L176.4 370.6 L177.3 368.7 L176.4 364.5 L174.0 364.4 L172.9 356.1 L176.4 352.9 L176.9 349.6 L176.2 344.4 L178.3 340.5 L181.0 339.0 L183.1 336.1 L179.7 332.9 L177.3 327.1 L174.5 323.4 L174.5 320.6 L175.5 317.5 L175.1 313.4 L173.7 309.1 L172.7 296.1 L179.0 295.2 L181.1 297.9 L182.8 297.8 L184.6 294.0 L184.6 276.0 L246.1 275.9 L271.3 276.0 Z' },
    { code: 'CA', name: 'California', d: 'M25.5 164.4 L40.3 164.3 L63.6 164.7 L81.5 164.7 L81.6 203.3 L81.5 231.5 L103.8 251.5 L124.9 271.1 L141.5 287.1 L153.4 299.0 L174.5 320.6 L174.5 323.4 L177.3 327.1 L179.7 332.9 L183.1 336.1 L181.0 339.0 L178.3 340.5 L176.2 344.4 L176.9 349.6 L176.4 352.9 L172.9 356.1 L174.0 364.4 L176.4 364.5 L177.3 368.7 L176.4 370.6 L173.0 371.5 L150.0 373.6 L131.3 375.5 L129.2 372.6 L129.1 368.0 L127.8 362.5 L125.3 358.6 L119.9 353.2 L113.0 348.2 L111.7 349.5 L109.0 348.7 L109.4 346.5 L106.4 342.0 L102.3 342.9 L95.1 339.6 L94.0 337.0 L89.2 333.7 L83.7 333.8 L79.1 332.3 L73.3 332.9 L70.3 330.0 L71.0 323.8 L69.9 322.8 L70.6 318.4 L66.0 315.1 L65.8 310.6 L64.1 310.3 L61.3 306.4 L59.3 305.6 L58.4 303.1 L51.8 294.0 L48.7 291.3 L48.0 284.1 L49.3 284.7 L50.6 280.4 L48.1 276.5 L45.1 277.0 L41.1 273.5 L39.7 270.7 L39.9 268.0 L38.0 264.4 L38.0 258.6 L41.2 258.6 L39.8 250.4 L38.4 251.2 L38.1 255.3 L34.7 256.1 L30.6 253.1 L30.0 247.8 L27.3 243.7 L23.8 241.1 L21.9 238.2 L16.8 232.4 L17.6 230.7 L15.3 223.3 L16.3 219.1 L14.8 212.9 L10.3 206.8 L6.0 203.4 L5.1 199.4 L9.5 189.6 L10.3 186.3 L9.5 183.7 L11.1 177.0 L9.7 170.9 L7.8 169.5 L8.5 164.6 L25.5 164.4 Z' },
    { code: 'CO', name: 'Colorado', d: 'M290.8 186.8 L328.7 186.9 L357.8 186.8 L392.4 186.8 L392.4 209.1 L392.6 276.2 L376.0 276.0 L352.8 276.2 L309.0 276.2 L299.4 276.0 L271.3 276.0 L271.3 250.0 L271.1 247.6 L271.2 228.7 L271.3 186.9 L290.8 186.8 Z' },
    { code: 'CT', name: 'Connecticut', d: 'M894.8 163.7 L916.5 164.1 L916.5 164.4 L916.5 177.6 L915.5 179.7 L913.9 179.3 L906.4 181.0 L897.3 180.6 L893.5 183.6 L889.3 184.6 L884.3 187.2 L883.1 184.6 L887.4 182.1 L886.1 180.3 L887.3 163.5 L894.8 163.7 Z' },
    { code: 'DC', name: 'District of Columbia', d: 'M825.8 231.6 L828.0 233.8 L825.7 236.1 L824.4 232.9 L825.8 231.6 Z' },
    { code: 'DE', name: 'Delaware', d: 'M853.9 213.5 L852.3 216.2 L850.5 217.7 L850.9 221.2 L853.4 224.5 L854.1 230.0 L857.8 235.7 L859.5 236.0 L860.2 243.7 L849.1 243.4 L847.4 215.4 L850.4 212.9 L853.9 213.5 Z' },
    { code: 'FL', name: 'Florida', d: 'M679.2 409.8 L687.8 409.7 L690.1 416.2 L713.9 417.6 L736.1 419.4 L736.9 424.1 L739.0 424.0 L739.8 419.5 L739.1 415.3 L740.7 413.6 L744.7 415.4 L749.4 416.3 L750.5 425.9 L752.7 436.8 L757.7 451.1 L765.4 466.4 L764.2 467.5 L764.6 474.5 L767.8 482.5 L772.9 498.5 L773.9 503.5 L773.8 508.6 L771.9 527.0 L770.3 527.4 L768.6 533.1 L769.2 535.0 L765.8 539.1 L764.5 538.1 L761.3 539.9 L755.8 540.8 L754.2 538.5 L754.9 535.1 L751.0 525.2 L748.0 523.4 L745.4 524.7 L743.3 519.2 L742.7 514.7 L739.1 509.7 L738.2 506.4 L738.8 501.6 L736.8 500.8 L737.3 503.6 L735.5 504.3 L730.0 492.2 L727.8 489.2 L733.0 480.3 L729.6 480.8 L727.3 483.6 L725.0 479.2 L728.1 467.0 L728.7 456.8 L726.6 454.4 L725.9 451.1 L722.6 450.4 L718.7 445.0 L715.6 442.8 L715.4 439.5 L713.2 438.3 L711.4 434.6 L704.7 429.7 L699.0 430.8 L699.2 434.3 L697.3 433.6 L690.1 437.8 L682.4 438.8 L682.6 436.3 L680.8 433.4 L671.8 426.8 L665.4 424.0 L659.6 423.3 L654.7 423.8 L644.2 425.8 L646.8 422.5 L645.4 420.7 L646.1 417.0 L642.2 412.8 L642.8 409.8 L679.2 409.8 Z' },
    { code: 'GA', name: 'Georgia', d: 'M720.6 320.6 L716.9 325.4 L716.6 327.7 L722.4 332.4 L724.2 332.1 L726.9 337.0 L727.4 339.5 L730.2 344.2 L734.2 347.0 L736.4 351.1 L741.1 354.9 L740.9 357.5 L743.9 361.6 L748.6 365.0 L749.7 368.7 L749.9 373.5 L752.3 375.0 L755.0 381.0 L755.1 384.8 L759.1 386.8 L754.8 394.3 L754.1 398.2 L752.3 401.7 L752.1 405.2 L750.2 406.8 L749.4 416.3 L744.7 415.4 L740.7 413.6 L739.1 415.3 L739.8 419.5 L739.0 424.0 L736.9 424.1 L736.1 419.4 L713.9 417.6 L690.1 416.2 L687.8 409.7 L685.9 403.6 L687.1 397.7 L685.4 391.0 L686.9 387.2 L686.8 384.4 L689.8 381.6 L687.8 380.3 L688.5 378.1 L686.6 374.6 L684.6 368.3 L680.4 340.1 L677.3 321.0 L699.6 320.8 L711.8 321.0 L720.6 320.6 Z' },
    { code: 'IA', name: 'Iowa', d: 'M577.5 131.1 L580.2 131.1 L580.4 134.4 L582.9 136.6 L580.8 139.3 L581.4 144.3 L582.7 147.8 L588.9 150.4 L590.1 153.2 L593.9 157.2 L594.4 159.6 L598.3 161.8 L598.8 164.6 L598.1 168.8 L595.8 170.3 L595.3 173.7 L589.8 176.5 L583.1 177.6 L582.0 181.5 L584.8 184.7 L584.5 188.6 L582.3 190.8 L581.8 194.2 L576.9 196.7 L576.7 200.7 L574.8 200.0 L571.3 195.5 L569.4 195.6 L544.8 196.2 L521.0 196.4 L501.3 196.1 L499.3 193.1 L500.3 187.4 L498.6 182.4 L498.7 176.8 L495.6 174.8 L495.2 171.8 L496.2 169.1 L495.1 165.2 L492.7 163.7 L489.6 153.7 L486.3 148.8 L487.9 145.5 L488.4 141.1 L489.8 139.5 L487.6 137.3 L488.1 133.4 L487.2 131.6 L489.5 131.1 L577.5 131.1 Z' },
    { code: 'ID', name: 'Idaho', d: 'M150.0 8.5 L150.0 31.4 L155.6 37.6 L155.7 43.7 L159.0 46.4 L162.5 47.4 L162.9 49.0 L169.4 54.9 L170.1 57.4 L174.7 59.7 L174.9 61.2 L179.9 61.0 L177.4 69.3 L176.9 74.6 L178.7 78.0 L175.6 80.5 L176.9 82.8 L176.0 85.2 L179.7 87.5 L184.0 84.5 L185.7 82.0 L188.8 84.2 L188.3 86.1 L190.0 90.3 L192.9 94.9 L195.0 96.4 L194.9 100.7 L196.9 102.6 L200.5 102.8 L202.8 110.0 L204.7 111.2 L206.5 109.1 L212.0 109.3 L215.9 107.3 L218.3 108.4 L222.4 107.4 L223.2 108.7 L226.8 107.8 L230.7 103.2 L233.5 107.1 L236.6 109.4 L236.6 164.6 L217.3 164.7 L184.7 164.7 L133.0 164.6 L133.0 123.8 L135.3 116.5 L133.9 114.6 L130.6 114.3 L129.3 111.2 L132.8 103.3 L134.6 102.6 L136.4 99.3 L136.1 97.2 L138.1 94.5 L139.2 90.6 L142.8 84.0 L141.4 80.9 L137.3 79.4 L134.9 75.6 L134.8 71.7 L132.5 67.8 L132.8 65.9 L132.7 36.1 L132.9 8.5 L150.0 8.5 Z' },
    { code: 'IL', name: 'Illinois', d: 'M590.1 153.2 L622.2 153.6 L639.3 153.6 L638.7 157.9 L641.4 162.9 L644.1 171.0 L644.0 223.7 L642.1 227.7 L644.3 232.4 L644.6 236.4 L642.4 239.5 L641.8 242.5 L638.7 247.2 L636.7 247.6 L637.2 250.4 L635.9 251.5 L634.8 256.7 L635.4 258.2 L633.1 261.4 L634.7 265.3 L627.6 267.4 L626.9 269.7 L628.6 272.6 L626.4 274.4 L620.0 271.0 L618.0 271.3 L615.4 275.2 L616.2 276.4 L613.5 276.2 L609.6 269.8 L611.0 268.3 L609.6 264.1 L609.6 260.6 L604.0 255.9 L602.1 256.4 L600.2 253.4 L595.1 248.9 L595.2 245.4 L598.1 239.6 L597.6 237.6 L599.3 234.9 L596.9 233.3 L593.1 232.3 L591.1 234.4 L589.8 233.1 L588.6 225.7 L582.8 221.0 L577.5 215.2 L575.3 208.4 L575.1 203.9 L576.7 200.7 L576.9 196.7 L581.8 194.2 L582.3 190.8 L584.5 188.6 L584.8 184.7 L582.0 181.5 L583.1 177.6 L589.8 176.5 L595.3 173.7 L595.8 170.3 L598.1 168.8 L598.8 164.6 L598.3 161.8 L594.4 159.6 L593.9 157.2 L590.1 153.2 Z' },
    { code: 'IN', name: 'Indiana', d: 'M670.7 169.9 L691.2 169.9 L691.2 171.4 L691.3 198.0 L691.0 229.2 L689.7 230.1 L691.1 236.2 L688.0 236.4 L684.8 238.4 L680.4 237.5 L680.6 241.8 L677.6 243.7 L676.5 246.5 L673.4 247.6 L671.8 253.2 L669.8 254.7 L665.9 252.6 L665.3 250.0 L661.5 252.8 L661.8 255.3 L657.9 256.1 L656.7 253.9 L652.4 256.1 L650.9 258.5 L646.6 255.2 L644.3 255.9 L642.8 254.3 L641.4 255.9 L637.0 256.1 L635.4 258.2 L634.8 256.7 L635.9 251.5 L637.2 250.4 L636.7 247.6 L638.7 247.2 L641.8 242.5 L642.4 239.5 L644.6 236.4 L644.3 232.4 L642.1 227.7 L644.0 223.7 L644.1 171.0 L645.8 172.5 L651.1 172.5 L656.3 169.9 L670.7 169.9 Z' },
    { code: 'KS', name: 'Kansas', d: 'M395.0 209.1 L509.3 209.1 L511.0 211.2 L516.6 212.9 L512.7 219.4 L514.9 221.6 L517.6 226.8 L521.3 227.9 L521.3 276.0 L426.5 276.0 L392.6 276.2 L392.4 209.1 L395.0 209.1 Z' },
    { code: 'KY', name: 'Kentucky', d: 'M706.8 236.6 L710.7 239.6 L713.5 238.1 L720.0 239.8 L721.9 237.6 L724.4 236.8 L725.1 240.6 L727.1 241.2 L729.5 244.3 L729.0 251.0 L731.1 255.3 L733.9 258.6 L734.7 261.1 L738.0 263.7 L740.3 264.1 L733.7 270.0 L727.3 273.3 L727.3 275.1 L724.8 276.5 L724.6 278.5 L721.3 279.3 L720.1 281.8 L710.8 284.9 L710.5 285.3 L695.7 285.1 L682.8 284.3 L679.4 284.6 L660.2 283.7 L638.4 284.2 L634.6 283.2 L634.9 287.3 L613.4 287.0 L611.3 287.3 L612.2 284.5 L614.8 285.4 L616.2 276.4 L615.4 275.2 L618.0 271.3 L620.0 271.0 L626.4 274.4 L628.6 272.6 L626.9 269.7 L627.6 267.4 L634.7 265.3 L633.1 261.4 L635.4 258.2 L637.0 256.1 L641.4 255.9 L642.8 254.3 L644.3 255.9 L646.6 255.2 L650.9 258.5 L652.4 256.1 L656.7 253.9 L657.9 256.1 L661.8 255.3 L661.5 252.8 L665.3 250.0 L665.9 252.6 L669.8 254.7 L671.8 253.2 L673.4 247.6 L676.5 246.5 L677.6 243.7 L680.6 241.8 L680.4 237.5 L684.8 238.4 L688.0 236.4 L691.1 236.2 L689.7 230.1 L691.0 229.2 L697.6 229.2 L701.1 233.8 L701.4 235.7 L706.8 236.6 Z' },
    { code: 'LA', name: 'Louisiana', d: 'M538.7 364.8 L581.0 365.2 L582.6 367.7 L581.4 368.7 L581.2 373.2 L583.8 376.0 L584.2 382.6 L582.1 387.7 L578.0 390.9 L576.9 395.9 L575.2 395.4 L575.0 403.6 L572.9 403.9 L574.1 408.2 L572.9 409.8 L605.6 409.8 L603.9 417.2 L606.7 422.0 L607.4 425.7 L609.5 428.0 L604.4 431.1 L604.0 433.3 L608.2 434.7 L610.0 431.2 L613.6 434.7 L613.3 437.5 L611.2 438.8 L607.3 437.7 L607.8 439.7 L606.5 442.9 L609.8 445.7 L615.1 446.6 L617.0 449.9 L618.5 450.4 L615.7 454.2 L612.7 453.4 L610.2 449.5 L603.8 447.4 L603.8 443.7 L600.7 444.9 L600.9 448.0 L599.4 451.0 L597.2 451.5 L595.4 448.2 L591.5 448.0 L590.0 451.5 L587.4 452.4 L584.5 450.4 L582.3 450.1 L580.1 444.6 L576.2 442.2 L574.7 442.6 L573.1 437.9 L568.6 438.5 L568.5 435.7 L564.0 438.4 L564.6 440.5 L561.2 442.4 L555.9 441.5 L549.7 438.4 L545.4 437.1 L536.0 438.2 L534.7 439.0 L533.2 436.8 L537.3 428.9 L536.0 424.6 L537.2 422.3 L536.6 419.2 L538.3 416.9 L540.1 411.2 L539.8 406.4 L535.1 397.4 L535.0 392.5 L531.2 387.6 L531.2 364.8 L538.7 364.8 Z' },
    { code: 'MA', name: 'Massachusetts', d: 'M931.8 144.8 L933.5 145.2 L934.2 149.1 L933.4 152.2 L930.6 155.2 L930.6 158.6 L934.3 159.1 L936.6 162.6 L936.2 165.4 L938.1 166.2 L938.3 168.7 L943.2 170.9 L948.8 168.8 L947.5 171.9 L939.3 174.6 L936.2 174.7 L934.4 172.6 L931.6 173.2 L931.5 174.8 L928.3 175.8 L926.9 171.8 L926.5 171.0 L924.7 169.5 L923.7 164.2 L921.2 164.2 L916.5 164.4 L916.5 164.1 L894.8 163.7 L887.3 163.5 L886.9 162.6 L891.1 148.0 L905.1 148.3 L925.2 149.1 L927.1 147.0 L931.8 144.8 Z' },
    { code: 'MD', name: 'Maryland', d: 'M843.8 254.8 L843.5 254.8 L843.0 254.8 L843.8 254.8 Z M783.5 215.4 L847.4 215.4 L849.1 243.4 L860.2 243.7 L856.8 253.1 L854.2 253.4 L849.4 254.8 L845.7 255.8 L845.8 252.1 L844.4 250.6 L846.4 249.1 L843.7 245.4 L842.9 247.0 L839.3 246.6 L838.0 242.6 L839.2 242.6 L839.3 237.3 L840.4 235.3 L838.9 228.2 L840.8 224.0 L843.7 223.3 L844.2 219.0 L842.0 219.5 L841.9 221.7 L837.4 224.5 L836.1 227.1 L835.8 233.5 L834.1 236.6 L834.8 241.7 L837.1 245.3 L836.8 248.0 L838.2 250.6 L837.5 252.5 L833.5 248.9 L827.8 247.2 L826.1 243.8 L822.9 245.8 L821.6 243.1 L824.2 239.6 L825.7 236.1 L828.0 233.8 L825.8 231.6 L824.4 232.9 L822.1 230.9 L818.5 229.8 L818.5 226.5 L816.6 224.6 L813.9 224.3 L812.0 218.0 L809.0 218.0 L806.1 216.0 L804.5 217.7 L801.6 217.6 L800.9 220.0 L795.8 218.4 L792.4 221.7 L790.1 221.0 L786.7 224.8 L783.3 226.8 L783.5 215.4 Z' },
    { code: 'ME', name: 'Maine', d: 'M935.5 141.0 L933.4 139.4 L933.7 137.2 L930.9 134.7 L929.8 105.4 L928.9 91.0 L936.4 87.9 L935.2 86.3 L938.0 82.9 L941.0 81.3 L940.4 80.0 L943.2 77.9 L942.3 74.0 L944.0 68.1 L946.7 66.2 L947.7 59.9 L961.1 42.9 L964.2 43.6 L964.4 47.7 L966.7 49.2 L972.3 46.8 L975.8 46.8 L978.3 45.2 L983.1 48.7 L986.0 51.6 L986.1 76.7 L985.8 82.7 L991.7 84.2 L990.9 86.8 L992.4 89.2 L991.2 91.4 L993.6 94.9 L996.9 94.1 L1000.0 102.1 L996.4 105.6 L994.3 104.3 L992.6 106.7 L990.1 106.1 L989.8 108.2 L986.6 107.9 L981.5 112.7 L980.3 109.4 L978.5 109.1 L979.3 112.7 L975.3 114.4 L974.4 111.6 L972.5 113.0 L968.0 113.0 L967.9 109.8 L965.3 110.5 L965.7 112.8 L963.3 117.7 L963.8 119.0 L960.5 121.7 L957.3 120.7 L955.4 123.5 L952.8 123.9 L950.6 126.2 L947.9 125.7 L947.2 123.3 L943.3 127.2 L944.3 129.7 L941.5 130.5 L941.3 132.6 L938.0 135.1 L935.5 141.0 Z' },
    { code: 'MI', name: 'Michigan', d: 'M714.6 170.6 L691.2 171.4 L691.2 169.9 L670.7 169.9 L656.3 169.9 L659.8 167.0 L662.1 162.0 L664.3 159.0 L665.9 154.7 L666.9 148.6 L666.5 142.0 L661.4 129.0 L663.0 124.2 L661.9 118.3 L665.8 112.3 L666.7 107.3 L666.1 104.6 L669.0 103.5 L669.4 99.9 L673.8 98.9 L677.2 94.9 L676.9 102.9 L678.7 103.3 L681.0 99.3 L681.1 92.4 L682.5 90.7 L687.3 89.6 L685.8 84.8 L688.9 80.8 L692.8 80.6 L697.2 83.1 L701.4 83.5 L703.5 86.7 L706.7 86.9 L712.1 89.9 L714.0 89.7 L717.0 94.5 L714.6 97.1 L716.9 100.4 L717.7 104.1 L716.7 112.4 L713.2 114.5 L712.3 118.8 L708.2 120.3 L705.9 125.4 L706.7 127.3 L710.9 129.2 L714.1 126.4 L717.9 120.6 L723.9 118.4 L726.9 120.1 L728.7 123.3 L730.5 132.6 L730.7 137.2 L732.6 142.8 L730.8 150.9 L728.0 152.1 L727.9 149.2 L726.0 150.0 L723.8 156.8 L720.3 159.3 L719.3 164.4 L714.9 168.7 L714.6 170.6 Z M679.0 81.4 L679.3 84.1 L677.0 84.6 L678.0 80.8 L679.0 81.4 Z M643.0 95.6 L640.3 93.3 L641.9 90.1 L637.9 89.6 L639.5 86.6 L639.7 82.7 L636.1 80.0 L634.1 77.2 L626.7 75.0 L624.4 75.7 L617.0 72.4 L599.1 67.9 L597.2 64.1 L594.0 62.8 L600.8 60.4 L603.8 57.7 L611.4 56.6 L616.3 53.4 L618.6 53.2 L620.5 50.9 L625.9 47.6 L628.7 44.8 L632.7 43.0 L636.6 44.6 L629.8 51.4 L628.2 53.7 L628.3 57.9 L631.6 54.7 L637.6 55.2 L642.2 57.4 L646.4 63.5 L648.7 64.6 L653.0 63.6 L654.1 64.9 L658.4 65.7 L667.7 60.6 L672.6 60.1 L679.0 60.3 L683.4 58.6 L686.7 58.5 L687.4 64.7 L690.8 65.6 L694.2 64.6 L695.6 66.0 L697.9 64.2 L702.9 63.6 L703.0 71.4 L705.3 74.7 L708.7 75.6 L709.1 73.4 L712.4 73.4 L714.2 75.7 L712.7 77.4 L703.2 75.9 L698.7 76.9 L693.7 74.2 L692.3 76.7 L693.0 78.7 L690.8 78.3 L687.6 75.2 L682.0 73.4 L679.1 73.3 L676.4 76.2 L671.8 76.9 L666.9 76.3 L664.9 77.5 L664.4 80.0 L659.0 82.0 L659.3 79.1 L656.9 78.5 L656.0 81.6 L652.0 81.7 L650.2 83.0 L647.5 88.3 L642.6 95.0 L643.0 95.6 Z M621.9 31.4 L617.6 34.2 L615.3 34.5 L615.5 32.2 L626.4 27.0 L624.3 30.6 L621.9 31.4 Z' },
    { code: 'MN', name: 'Minnesota', d: 'M566.3 59.7 L565.0 58.7 L561.5 60.6 L561.5 73.7 L560.4 75.1 L555.5 76.9 L551.5 81.7 L551.2 84.8 L553.2 85.1 L555.4 87.9 L553.4 91.3 L553.8 95.1 L552.6 103.3 L557.1 107.3 L560.7 107.7 L562.5 110.1 L567.8 112.6 L568.7 115.5 L573.6 119.3 L576.4 120.1 L579.7 125.0 L579.2 128.6 L580.2 131.1 L577.5 131.1 L489.5 131.1 L489.5 91.1 L485.5 88.5 L482.4 84.2 L487.2 79.5 L487.6 76.9 L486.9 68.0 L484.8 65.7 L483.4 60.8 L483.7 54.8 L483.0 53.8 L482.4 39.6 L479.0 32.0 L477.7 27.7 L477.1 18.7 L478.3 15.6 L476.0 8.5 L512.0 8.5 L512.0 0.0 L515.4 0.2 L517.6 2.0 L519.9 13.6 L521.7 14.9 L527.4 15.3 L528.1 16.4 L534.7 16.8 L535.5 19.3 L541.2 18.7 L541.2 17.7 L545.6 16.5 L549.5 17.0 L554.0 18.8 L555.2 21.1 L557.8 20.9 L560.2 25.9 L561.3 23.8 L565.7 22.8 L566.4 24.9 L571.5 26.4 L571.5 28.3 L574.1 29.9 L579.3 29.1 L582.4 26.9 L586.7 25.5 L588.2 28.8 L591.2 28.1 L594.7 28.8 L598.8 28.3 L603.4 31.1 L607.9 30.6 L607.5 31.9 L601.7 34.7 L593.6 36.9 L588.4 39.2 L580.9 44.9 L577.7 48.5 L572.8 52.5 L565.0 57.9 L566.3 59.7 Z' },
    { code: 'MO', name: 'Missouri', d: 'M569.4 195.6 L571.3 195.5 L574.8 200.0 L576.7 200.7 L575.1 203.9 L575.3 208.4 L577.5 215.2 L582.8 221.0 L588.6 225.7 L589.8 233.1 L591.1 234.4 L593.1 232.3 L596.9 233.3 L599.3 234.9 L597.6 237.6 L598.1 239.6 L595.2 245.4 L595.1 248.9 L600.2 253.4 L602.1 256.4 L604.0 255.9 L609.6 260.6 L609.6 264.1 L611.0 268.3 L609.6 269.8 L613.5 276.2 L616.2 276.4 L614.8 285.4 L612.2 284.5 L611.3 287.3 L610.2 287.3 L609.2 287.3 L609.3 292.8 L605.9 298.4 L594.7 298.4 L597.4 294.2 L600.1 291.5 L598.6 287.3 L523.7 287.1 L521.3 287.1 L521.3 276.0 L521.3 227.9 L517.6 226.8 L514.9 221.6 L512.7 219.4 L516.6 212.9 L511.0 211.2 L509.3 209.1 L505.0 203.3 L501.3 196.1 L521.0 196.4 L544.8 196.2 L569.4 195.6 Z' },
    { code: 'MS', name: 'Mississippi', d: 'M627.7 320.7 L632.4 320.7 L634.2 323.0 L631.7 347.4 L627.7 389.8 L629.0 423.9 L627.1 424.9 L623.0 424.4 L621.3 422.9 L617.1 423.9 L611.3 426.4 L609.5 428.0 L607.4 425.7 L606.7 422.0 L603.9 417.2 L605.6 409.8 L572.9 409.8 L574.1 408.2 L572.9 403.9 L575.0 403.6 L575.2 395.4 L576.9 395.9 L578.0 390.9 L582.1 387.7 L584.2 382.6 L583.8 376.0 L581.2 373.2 L581.4 368.7 L582.6 367.7 L581.0 365.2 L582.4 362.1 L581.4 357.5 L582.9 355.6 L579.9 352.7 L582.6 345.9 L585.8 342.3 L584.7 339.9 L588.3 336.2 L588.2 334.8 L591.4 333.5 L591.1 329.1 L592.9 328.2 L594.1 324.4 L596.9 322.7 L595.8 320.7 L627.7 320.7 Z' },
    { code: 'MT', name: 'Montana', d: 'M357.9 8.5 L358.0 33.9 L357.9 76.7 L358.0 97.8 L357.7 97.8 L325.5 97.7 L270.7 97.7 L236.5 97.7 L236.6 109.4 L233.5 107.1 L230.7 103.2 L226.8 107.8 L223.2 108.7 L222.4 107.4 L218.3 108.4 L215.9 107.3 L212.0 109.3 L206.5 109.1 L204.7 111.2 L202.8 110.0 L200.5 102.8 L196.9 102.6 L194.9 100.7 L195.0 96.4 L192.9 94.9 L190.0 90.3 L188.3 86.1 L188.8 84.2 L185.7 82.0 L184.0 84.5 L179.7 87.5 L176.0 85.2 L176.9 82.8 L175.6 80.5 L178.7 78.0 L176.9 74.6 L177.4 69.3 L179.9 61.0 L174.9 61.2 L174.7 59.7 L170.1 57.4 L169.4 54.9 L162.9 49.0 L162.5 47.4 L159.0 46.4 L155.7 43.7 L155.6 37.6 L150.0 31.4 L150.0 8.5 L228.7 8.7 L264.2 8.5 L357.9 8.5 Z' },
    { code: 'NC', name: 'North Carolina', d: 'M757.5 285.8 L769.4 286.2 L782.9 286.3 L846.0 286.0 L848.0 295.0 L843.2 294.1 L842.5 295.2 L836.6 296.5 L835.8 297.8 L831.9 298.1 L832.1 299.7 L836.8 298.6 L837.5 299.6 L842.7 298.5 L844.4 300.6 L847.5 299.7 L848.7 305.1 L847.6 307.7 L845.5 307.9 L841.2 313.4 L835.4 313.6 L834.4 317.4 L836.9 321.2 L838.9 321.9 L835.2 328.2 L832.1 327.4 L826.6 328.0 L822.8 329.4 L816.8 333.7 L812.0 339.3 L809.6 346.4 L806.0 344.8 L799.7 346.2 L780.1 325.0 L760.6 324.6 L760.9 322.1 L758.3 318.3 L756.5 319.6 L756.4 317.3 L735.0 316.2 L730.3 317.1 L726.6 319.1 L720.6 320.6 L711.8 321.0 L699.6 320.8 L700.1 315.6 L703.5 315.1 L704.8 311.4 L709.1 308.1 L713.9 308.0 L718.1 304.6 L722.6 303.4 L726.4 298.4 L728.7 296.9 L729.2 299.1 L736.1 294.8 L739.2 295.7 L741.4 291.5 L744.6 290.4 L745.4 285.2 L757.5 285.8 Z' },
    { code: 'ND', name: 'North Dakota', d: 'M476.0 8.5 L478.3 15.6 L477.1 18.7 L477.7 27.7 L479.0 32.0 L482.4 39.6 L483.0 53.8 L483.7 54.8 L483.4 60.8 L484.8 65.7 L486.9 68.0 L487.6 76.9 L357.9 76.7 L358.0 33.9 L357.9 8.5 L476.0 8.5 Z' },
    { code: 'NE', name: 'Nebraska', d: 'M370.4 142.2 L399.8 142.3 L454.0 142.3 L454.6 143.4 L463.5 147.5 L465.6 145.3 L468.0 145.8 L476.2 145.8 L485.3 149.9 L486.4 153.1 L489.6 153.7 L492.7 163.7 L495.1 165.2 L496.2 169.1 L495.2 171.8 L495.6 174.8 L498.7 176.8 L498.6 182.4 L500.3 187.4 L499.3 193.1 L501.3 196.1 L505.0 203.3 L509.3 209.1 L395.0 209.1 L392.4 209.1 L392.4 186.8 L357.8 186.8 L357.8 142.2 L370.4 142.2 Z' },
    { code: 'NH', name: 'New Hampshire', d: 'M928.9 91.0 L929.8 105.4 L930.9 134.7 L933.7 137.2 L933.4 139.4 L935.5 141.0 L933.5 145.2 L931.8 144.8 L927.1 147.0 L925.2 149.1 L905.1 148.3 L903.6 146.6 L903.8 143.3 L905.3 142.1 L905.1 138.9 L906.5 129.5 L909.5 125.1 L911.0 120.1 L912.5 118.3 L912.4 112.8 L918.2 110.7 L921.1 106.9 L919.4 103.3 L921.8 99.6 L921.6 97.4 L924.1 91.7 L928.1 92.3 L928.9 91.0 Z' },
    { code: 'NJ', name: 'New Jersey', d: 'M874.3 183.7 L880.1 186.9 L878.0 193.4 L875.1 194.8 L873.6 198.3 L878.4 200.0 L878.7 202.5 L876.7 214.5 L871.3 223.4 L867.7 226.0 L864.6 231.6 L863.0 227.9 L858.0 226.1 L851.8 221.2 L851.4 217.9 L851.3 217.4 L852.3 216.2 L853.9 213.5 L858.5 211.7 L858.8 210.0 L864.1 206.3 L865.0 204.4 L860.1 199.9 L859.9 197.0 L857.7 196.3 L857.5 193.7 L860.2 189.8 L858.7 187.5 L863.1 182.9 L864.0 180.4 L866.3 178.9 L874.3 183.7 Z' },
    { code: 'NM', name: 'New Mexico', d: 'M299.4 276.0 L309.0 276.2 L352.8 276.2 L376.0 276.0 L376.0 287.1 L375.3 287.1 L375.2 342.6 L374.9 365.2 L374.9 387.5 L313.4 387.5 L312.9 389.7 L314.9 392.3 L285.8 392.3 L285.8 402.4 L271.3 402.4 L271.3 276.0 L299.4 276.0 Z' },
    { code: 'NV', name: 'Nevada', d: 'M133.0 164.6 L184.7 164.7 L184.6 276.0 L184.6 294.0 L182.8 297.8 L181.1 297.9 L179.0 295.2 L172.7 296.1 L173.7 309.1 L175.1 313.4 L175.5 317.5 L174.5 320.6 L153.4 299.0 L141.5 287.1 L124.9 271.1 L103.8 251.5 L81.5 231.5 L81.6 203.3 L81.5 164.7 L104.1 164.8 L133.0 164.6 Z' },
    { code: 'NY', name: 'New York', d: 'M889.8 97.4 L889.9 102.1 L889.0 106.2 L890.6 110.2 L890.1 114.5 L888.1 119.0 L889.7 125.1 L888.7 127.0 L891.5 130.6 L890.9 146.0 L891.1 148.0 L886.9 162.6 L887.3 163.5 L886.1 180.3 L887.4 182.1 L883.1 184.6 L884.3 187.2 L891.7 189.0 L893.3 187.6 L899.6 187.6 L902.8 186.9 L908.2 183.4 L908.5 185.9 L911.3 187.0 L904.9 190.3 L891.6 195.2 L886.0 196.2 L882.3 195.9 L879.5 197.0 L878.0 193.4 L880.1 186.9 L874.3 183.7 L866.3 178.9 L865.6 177.3 L862.9 177.1 L859.8 173.4 L860.2 170.1 L858.1 167.5 L856.7 167.6 L854.8 164.6 L778.6 164.6 L778.6 159.0 L778.6 158.6 L789.2 152.2 L790.9 149.2 L794.3 147.1 L793.0 143.3 L791.6 142.6 L790.5 136.5 L800.7 133.9 L809.7 134.0 L813.3 134.7 L817.2 137.1 L819.6 136.1 L827.1 136.2 L831.7 134.7 L836.5 130.6 L839.7 130.5 L839.8 124.4 L841.4 120.9 L837.5 118.4 L838.3 115.6 L845.3 111.8 L847.8 108.5 L856.2 101.1 L864.0 97.3 L875.8 97.9 L889.8 97.4 Z' },
    { code: 'OH', name: 'Ohio', d: 'M765.5 165.1 L765.5 195.0 L762.9 196.2 L764.1 198.6 L764.0 202.0 L761.7 207.4 L760.1 215.6 L753.3 222.8 L751.1 223.8 L749.2 222.3 L747.2 225.5 L745.3 225.4 L743.1 229.6 L743.5 232.2 L741.7 234.3 L739.2 230.9 L736.0 236.2 L736.8 239.6 L734.7 240.9 L734.1 243.8 L729.5 244.3 L727.1 241.2 L725.1 240.6 L724.4 236.8 L721.9 237.6 L720.0 239.8 L713.5 238.1 L710.7 239.6 L706.8 236.6 L701.4 235.7 L701.1 233.8 L697.6 229.2 L691.0 229.2 L691.3 198.0 L691.2 171.4 L714.6 170.6 L721.3 173.6 L723.6 175.4 L725.3 173.7 L729.1 177.3 L731.5 178.4 L739.6 175.4 L744.3 176.0 L749.4 171.9 L756.9 167.9 L765.5 165.1 L765.5 165.1 Z' },
    { code: 'OK', name: 'Oklahoma', d: 'M426.5 276.0 L521.3 276.0 L521.3 287.1 L524.5 311.8 L523.5 351.0 L516.9 348.5 L515.2 346.0 L510.7 343.8 L509.6 345.7 L505.1 345.6 L504.2 344.4 L500.1 346.6 L498.4 345.4 L494.7 346.5 L491.3 349.9 L489.9 347.9 L486.3 346.4 L482.5 346.4 L481.3 343.8 L476.9 348.8 L475.5 346.0 L473.5 346.8 L472.0 345.0 L467.9 343.3 L464.9 346.2 L463.6 343.2 L461.1 342.8 L459.7 340.4 L456.4 339.4 L454.2 341.5 L452.8 339.6 L449.3 339.9 L445.5 337.9 L442.0 338.2 L440.8 333.9 L435.3 333.7 L433.2 334.4 L429.3 330.1 L428.0 330.4 L428.0 287.1 L396.6 287.1 L376.0 287.1 L376.0 276.0 L392.6 276.2 L426.5 276.0 Z' },
    { code: 'OR', name: 'Oregon', d: 'M25.9 71.5 L27.5 71.3 L31.2 73.6 L32.8 76.3 L33.7 83.0 L42.6 85.5 L50.2 81.9 L54.9 81.6 L60.4 82.8 L61.0 84.2 L70.5 81.1 L72.8 82.2 L77.9 81.6 L82.2 79.4 L89.8 77.4 L96.7 76.9 L99.1 75.4 L134.9 75.6 L137.3 79.4 L141.4 80.9 L142.8 84.0 L139.2 90.6 L138.1 94.5 L136.1 97.2 L136.4 99.3 L134.6 102.6 L132.8 103.3 L129.3 111.2 L130.6 114.3 L133.9 114.6 L135.3 116.5 L133.0 123.8 L133.0 164.6 L104.1 164.8 L81.5 164.7 L63.6 164.7 L40.3 164.3 L25.5 164.4 L8.5 164.6 L6.1 162.0 L4.7 154.8 L5.0 149.8 L2.7 145.9 L4.4 142.2 L5.6 136.2 L8.2 129.9 L9.3 124.3 L11.2 105.4 L10.9 102.8 L12.6 94.5 L13.3 83.0 L12.3 76.7 L13.2 72.9 L20.1 69.6 L23.1 72.2 L25.9 71.5 Z' },
    { code: 'PA', name: 'Pennsylvania', d: 'M778.6 159.0 L778.6 164.6 L854.8 164.6 L856.7 167.6 L858.1 167.5 L860.2 170.1 L859.8 173.4 L862.9 177.1 L865.6 177.3 L866.3 178.9 L864.0 180.4 L863.1 182.9 L858.7 187.5 L860.2 189.8 L857.5 193.7 L857.7 196.3 L859.9 197.0 L860.1 199.9 L865.0 204.4 L864.1 206.3 L858.8 210.0 L858.5 211.7 L853.9 213.5 L850.4 212.9 L847.4 215.4 L783.5 215.4 L765.5 215.4 L765.5 195.0 L765.5 165.1 L765.5 165.1 L768.7 163.8 L778.6 158.6 L778.6 159.0 Z' },
    { code: 'RI', name: 'Rhode Island', d: 'M926.9 171.8 L928.3 175.8 L924.9 176.3 L926.9 171.8 Z M921.2 164.2 L923.7 164.2 L924.7 169.5 L926.5 171.0 L924.4 170.7 L922.6 174.0 L922.0 178.6 L915.5 179.7 L916.5 177.6 L916.5 164.4 L921.2 164.2 Z' },
    { code: 'SC', name: 'South Carolina', d: 'M726.6 319.1 L730.3 317.1 L735.0 316.2 L756.4 317.3 L756.5 319.6 L758.3 318.3 L760.9 322.1 L760.6 324.6 L780.1 325.0 L799.7 346.2 L796.7 347.3 L792.9 351.0 L789.2 356.7 L788.5 361.4 L785.6 365.0 L781.7 365.0 L780.8 367.7 L776.8 370.6 L774.5 373.8 L770.9 375.2 L767.0 378.6 L766.6 380.2 L763.0 382.0 L759.1 386.8 L755.1 384.8 L755.0 381.0 L752.3 375.0 L749.9 373.5 L749.7 368.7 L748.6 365.0 L743.9 361.6 L740.9 357.5 L741.1 354.9 L736.4 351.1 L734.2 347.0 L730.2 344.2 L727.4 339.5 L726.9 337.0 L724.2 332.1 L722.4 332.4 L716.6 327.7 L716.9 325.4 L720.6 320.6 L726.6 319.1 Z' },
    { code: 'SD', name: 'South Dakota', d: 'M357.9 76.7 L487.6 76.9 L487.2 79.5 L482.4 84.2 L485.5 88.5 L489.5 91.1 L489.5 131.1 L487.2 131.6 L488.1 133.4 L487.6 137.3 L489.8 139.5 L488.4 141.1 L487.9 145.5 L486.3 148.8 L489.6 153.7 L486.4 153.1 L485.3 149.9 L476.2 145.8 L468.0 145.8 L465.6 145.3 L463.5 147.5 L454.6 143.4 L454.0 142.3 L399.8 142.3 L370.4 142.2 L357.8 142.2 L357.7 97.8 L358.0 97.8 L357.9 76.7 Z' },
    { code: 'TN', name: 'Tennessee', d: 'M634.9 287.3 L634.6 283.2 L638.4 284.2 L660.2 283.7 L679.4 284.6 L682.8 284.3 L695.7 285.1 L710.5 285.3 L710.8 284.9 L745.4 285.2 L744.6 290.4 L741.4 291.5 L739.2 295.7 L736.1 294.8 L729.2 299.1 L728.7 296.9 L726.4 298.4 L722.6 303.4 L718.1 304.6 L713.9 308.0 L709.1 308.1 L704.8 311.4 L703.5 315.1 L700.1 315.6 L699.6 320.8 L677.3 321.0 L647.0 320.6 L632.4 320.7 L627.7 320.7 L595.8 320.7 L597.5 320.1 L599.2 316.2 L599.0 310.8 L602.2 307.2 L602.8 303.7 L605.3 302.5 L605.9 298.4 L609.3 292.8 L609.2 287.3 L610.2 287.3 L611.3 287.3 L613.4 287.0 L634.9 287.3 Z' },
    { code: 'TX', name: 'Texas', d: 'M396.6 287.1 L428.0 287.1 L428.0 330.4 L429.3 330.1 L433.2 334.4 L435.3 333.7 L440.8 333.9 L442.0 338.2 L445.5 337.9 L449.3 339.9 L452.8 339.6 L454.2 341.5 L456.4 339.4 L459.7 340.4 L461.1 342.8 L463.6 343.2 L464.9 346.2 L467.9 343.3 L472.0 345.0 L473.5 346.8 L475.5 346.0 L476.9 348.8 L481.3 343.8 L482.5 346.4 L486.3 346.4 L489.9 347.9 L491.3 349.9 L494.7 346.5 L498.4 345.4 L500.1 346.6 L504.2 344.4 L505.1 345.6 L509.6 345.7 L510.7 343.8 L515.2 346.0 L516.9 348.5 L523.5 351.0 L525.3 353.1 L528.7 352.0 L531.2 352.9 L531.2 364.8 L531.2 387.6 L535.0 392.5 L535.1 397.4 L539.8 406.4 L540.1 411.2 L538.3 416.9 L536.6 419.2 L537.2 422.3 L536.0 424.6 L537.3 428.9 L533.2 436.8 L534.7 439.0 L531.9 439.1 L522.9 442.2 L519.6 440.5 L519.1 436.8 L516.8 439.4 L515.2 438.8 L514.3 441.9 L516.1 443.3 L516.4 447.4 L513.2 451.8 L508.0 457.3 L497.5 463.2 L496.5 462.2 L493.4 463.7 L493.3 462.3 L489.0 463.3 L487.0 460.5 L485.8 461.1 L490.3 466.8 L487.0 468.7 L483.9 467.6 L483.4 471.6 L479.5 475.8 L475.5 483.5 L473.0 491.5 L471.1 490.9 L470.6 493.8 L472.6 493.1 L471.6 499.0 L470.3 499.2 L470.2 502.5 L471.8 504.3 L472.3 511.0 L474.2 513.4 L474.7 517.6 L476.2 521.4 L470.9 523.7 L468.7 520.8 L464.6 519.7 L459.2 520.0 L454.6 516.3 L451.0 515.9 L448.4 513.0 L444.8 512.0 L442.3 509.2 L440.7 502.5 L437.6 498.5 L438.0 495.0 L436.5 491.4 L437.0 488.2 L434.8 484.7 L433.0 484.3 L430.1 481.1 L429.1 477.1 L426.6 473.4 L422.9 470.4 L421.1 463.7 L419.4 461.8 L417.1 456.5 L416.3 452.1 L414.1 448.9 L410.4 446.1 L409.6 444.1 L406.2 442.4 L403.5 437.5 L395.9 436.4 L391.4 436.7 L387.5 435.0 L386.6 437.3 L382.4 438.0 L379.3 442.7 L377.4 450.1 L376.4 450.2 L374.0 454.6 L371.2 454.8 L366.9 451.3 L356.2 445.8 L354.1 442.9 L349.9 440.1 L347.0 433.8 L346.8 428.0 L343.8 423.4 L343.2 419.4 L341.3 416.8 L334.5 413.0 L330.9 407.9 L328.0 406.0 L324.9 401.7 L320.5 399.3 L317.5 393.5 L314.9 392.3 L312.9 389.7 L313.4 387.5 L374.9 387.5 L374.9 365.2 L375.2 342.6 L375.3 287.1 L376.0 287.1 L396.6 287.1 Z' },
    { code: 'UT', name: 'Utah', d: 'M217.3 164.7 L236.6 164.6 L236.6 186.9 L271.3 186.9 L271.2 228.7 L271.1 247.6 L271.3 250.0 L271.3 276.0 L246.1 275.9 L184.6 276.0 L184.7 164.7 L217.3 164.7 Z' },
    { code: 'VA', name: 'Virginia', d: 'M854.2 253.4 L856.8 253.1 L854.6 256.9 L852.2 258.2 L850.8 263.3 L847.2 271.6 L844.2 273.3 L843.3 270.3 L844.8 263.5 L849.4 254.8 L854.2 253.4 Z M843.5 254.8 L843.8 254.8 L843.0 254.8 L843.5 254.8 Z M803.0 221.1 L812.0 228.5 L813.9 224.3 L816.6 224.6 L818.5 226.5 L818.5 229.8 L822.1 230.9 L824.4 232.9 L825.7 236.1 L824.2 239.6 L822.1 240.6 L820.8 243.8 L821.5 246.1 L826.2 245.4 L827.0 248.9 L833.1 250.4 L834.8 253.2 L839.7 256.3 L837.5 262.5 L839.5 267.4 L837.1 269.7 L836.8 272.5 L839.0 274.2 L836.6 276.9 L833.0 273.3 L832.2 274.6 L835.3 277.1 L843.8 277.7 L846.0 286.0 L782.9 286.3 L769.4 286.2 L757.5 285.8 L745.4 285.2 L710.8 284.9 L720.1 281.8 L721.3 279.3 L724.6 278.5 L724.8 276.5 L727.3 275.1 L727.3 273.3 L733.7 270.0 L740.3 264.1 L740.0 265.9 L742.4 269.7 L745.4 271.5 L747.5 271.4 L750.9 268.5 L753.2 270.8 L757.7 269.6 L765.6 265.3 L766.2 266.6 L769.3 264.7 L769.4 260.6 L771.3 257.1 L774.5 253.8 L775.8 249.8 L779.2 245.6 L780.6 240.5 L783.5 243.6 L786.3 244.5 L788.1 242.7 L791.8 234.8 L794.0 236.7 L802.1 227.7 L803.0 221.1 Z' },
    { code: 'VT', name: 'Vermont', d: 'M921.6 97.4 L921.8 99.6 L919.4 103.3 L921.1 106.9 L918.2 110.7 L912.4 112.8 L912.5 118.3 L911.0 120.1 L909.5 125.1 L906.5 129.5 L905.1 138.9 L905.3 142.1 L903.8 143.3 L903.6 146.6 L905.1 148.3 L891.1 148.0 L890.9 146.0 L891.5 130.6 L888.7 127.0 L889.7 125.1 L888.1 119.0 L890.1 114.5 L890.6 110.2 L889.0 106.2 L889.9 102.1 L889.8 97.4 L907.7 97.7 L921.6 97.4 Z' },
    { code: 'WA', name: 'Washington', d: 'M132.9 8.5 L132.7 36.1 L132.8 65.9 L132.5 67.8 L134.8 71.7 L134.9 75.6 L99.1 75.4 L96.7 76.9 L89.8 77.4 L82.2 79.4 L77.9 81.6 L72.8 82.2 L70.5 81.1 L61.0 84.2 L60.4 82.8 L54.9 81.6 L50.2 81.9 L42.6 85.5 L33.7 83.0 L32.8 76.3 L31.2 73.6 L27.5 71.3 L25.9 71.5 L23.1 72.2 L20.1 69.6 L17.0 68.7 L14.4 70.1 L11.1 68.1 L11.8 65.1 L14.0 63.5 L10.5 58.8 L8.2 46.8 L6.7 45.2 L4.8 36.6 L1.4 33.3 L0.0 26.7 L1.9 22.3 L5.4 24.4 L12.5 27.2 L17.4 27.1 L22.2 28.2 L26.8 27.1 L28.9 29.1 L33.0 28.9 L35.9 33.8 L38.0 33.5 L38.3 40.0 L39.6 46.0 L41.3 45.4 L39.6 40.3 L40.0 35.3 L42.9 30.2 L40.6 28.1 L40.4 24.4 L38.7 20.4 L39.6 17.5 L38.4 14.0 L35.7 13.6 L33.1 11.0 L33.8 8.5 L132.9 8.5 Z M34.4 23.9 L36.7 23.0 L36.3 27.5 L33.6 25.8 L34.4 23.9 Z M29.1 17.8 L31.0 14.9 L33.6 18.4 L32.8 21.5 L28.8 20.6 L29.1 17.8 Z' },
    { code: 'WI', name: 'Wisconsin', d: 'M594.0 62.8 L597.2 64.1 L599.1 67.9 L617.0 72.4 L624.4 75.7 L626.7 75.0 L634.1 77.2 L636.1 80.0 L639.7 82.7 L639.5 86.6 L637.9 89.6 L641.9 90.1 L640.3 93.3 L643.0 95.6 L642.3 98.3 L639.0 98.8 L636.1 103.9 L635.1 107.4 L637.1 108.0 L639.8 105.7 L642.6 101.3 L646.2 99.6 L649.1 94.0 L652.7 92.8 L652.4 95.7 L649.9 98.4 L645.1 107.7 L643.7 112.8 L643.8 116.5 L642.0 117.7 L640.4 122.7 L641.0 127.0 L639.5 129.8 L637.4 136.7 L637.9 142.2 L639.9 147.1 L639.3 153.6 L622.2 153.6 L590.1 153.2 L588.9 150.4 L582.7 147.8 L581.4 144.3 L580.8 139.3 L582.9 136.6 L580.4 134.4 L580.2 131.1 L579.2 128.6 L579.7 125.0 L576.4 120.1 L573.6 119.3 L568.7 115.5 L567.8 112.6 L562.5 110.1 L560.7 107.7 L557.1 107.3 L552.6 103.3 L553.8 95.1 L553.4 91.3 L555.4 87.9 L553.2 85.1 L551.2 84.8 L551.5 81.7 L555.5 76.9 L560.4 75.1 L561.5 73.7 L561.5 60.6 L565.0 58.7 L566.3 59.7 L570.2 59.9 L582.3 56.2 L586.7 54.1 L588.2 55.7 L585.9 58.6 L591.6 62.4 L594.0 62.8 Z' },
    { code: 'WV', name: 'West Virginia', d: 'M765.5 195.0 L765.5 215.4 L783.5 215.4 L783.3 226.8 L786.7 224.8 L790.1 221.0 L792.4 221.7 L795.8 218.4 L800.9 220.0 L801.6 217.6 L804.5 217.7 L806.1 216.0 L809.0 218.0 L812.0 218.0 L813.9 224.3 L812.0 228.5 L803.0 221.1 L802.1 227.7 L794.0 236.7 L791.8 234.8 L788.1 242.7 L786.3 244.5 L783.5 243.6 L780.6 240.5 L779.2 245.6 L775.8 249.8 L774.5 253.8 L771.3 257.1 L769.4 260.6 L769.3 264.7 L766.2 266.6 L765.6 265.3 L757.7 269.6 L753.2 270.8 L750.9 268.5 L747.5 271.4 L745.4 271.5 L742.4 269.7 L740.0 265.9 L740.3 264.1 L738.0 263.7 L734.7 261.1 L733.9 258.6 L731.1 255.3 L729.0 251.0 L729.5 244.3 L734.1 243.8 L734.7 240.9 L736.8 239.6 L736.0 236.2 L739.2 230.9 L741.7 234.3 L743.5 232.2 L743.1 229.6 L745.3 225.4 L747.2 225.5 L749.2 222.3 L751.1 223.8 L753.3 222.8 L760.1 215.6 L761.7 207.4 L764.0 202.0 L764.1 198.6 L762.9 196.2 L765.5 195.0 Z' },
    { code: 'WY', name: 'Wyoming', d: 'M270.7 97.7 L325.5 97.7 L357.7 97.8 L357.8 142.2 L357.8 186.8 L328.7 186.9 L290.8 186.8 L271.3 186.9 L236.6 186.9 L236.6 164.6 L236.6 109.4 L236.5 97.7 L270.7 97.7 Z' },
];


window.DATA = {
  MARKET_LABEL, PROVIDERS, getProvider, starTone, getDetail,
  CASES, ACTION_PLAN_GROUPS, BOOK_OF_BUSINESS, COVERAGE, LEADERSHIP,
  US_STATES, US_MAP_VIEWBOX
};
})();
