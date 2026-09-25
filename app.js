/* Provider CRM — standalone microsite
 * Faithful reproduction of the Salesforce org (SLDS + ported component markup/data).
 */
(function () {
    'use strict';
    var D = window.DATA;
    var app = document.getElementById('app');
    var CDN = 'assets/icons/';

    /* ---------------- tabs ---------------- */
    var TABS = [
        { id: 'portfolio', label: 'Provider Portfolio', icon: 'household', route: '#/portfolio' },
        { id: 'coverage', label: 'Coverage Map', icon: 'service_territory', route: '#/coverage' },
        { id: 'cases', label: 'My Cases', icon: 'case', route: '#/cases' },
        { id: 'plans', label: 'My Action Plans', icon: 'task2', route: '#/plans' },
        { id: 'book', label: 'Book of Business', icon: 'report', route: '#/book' },
        { id: 'leadership', label: 'Leadership Dashboard', icon: 'dashboard', route: '#/leadership' }
    ];

    /* ---------------- state ---------------- */
    var S = {
        portfolio: { search: '', market: 'All', priority: 'All', assigned: 'All', sort: 'Priority' },
        cases: { status: 'All', priority: 'All', assigned: 'All' },
        plans: { status: 'All', category: 'All', assigned: 'All' },
        book: { search: '', market: 'All', state: 'All', stars: 'All', engagement: 'All' },
        coverage: { selected: null },
        detailTab: 'overview'
    };

    /* ---------------- helpers ---------------- */
    function icon(sprite, name, cls) {
        return '<svg class="slds-icon ' + (cls || '') + '" aria-hidden="true"><use xlink:href="' +
            CDN + sprite + '-sprite/svg/symbols.svg#' + name + '"></use></svg>';
    }
    function sel(fname, label, value, options, hideLabel) {
        var opts = options.map(function (o) {
            return '<option value="' + o.value + '"' + (o.value === value ? ' selected' : '') + '>' + o.label + '</option>';
        }).join('');
        return '<div class="slds-form-element fbox">' +
            (hideLabel ? '' : '<label class="slds-form-element__label">' + label + '</label>') +
            '<div class="slds-form-element__control"><div class="slds-select_container">' +
            '<select class="slds-select" data-f="' + fname + '">' + opts + '</select></div></div></div>';
    }
    function card(title, body, actions, extra) {
        var header = (title || actions) ?
            '<div class="slds-card__header slds-grid"><header class="slds-media slds-media_center slds-has-flexi-truncate">' +
            '<div class="slds-media__body"><h2 class="slds-card__header-title"><span>' + (title || '') + '</span></h2></div>' +
            (actions ? '<div class="slds-no-flex">' + actions + '</div>' : '') + '</header></div>' : '';
        return '<article class="slds-card ' + (extra || '') + '">' + header +
            '<div class="slds-card__body slds-card__body_inner">' + body + '</div></article>';
    }
    function opts(arr) { return arr.map(function (v) { return { label: v, value: v }; }); }
    function pageHeader(ic, title, meta, actions) {
        return '<div class="slds-page-header slds-page-header_joined"><div class="slds-page-header__row">' +
            '<div class="slds-page-header__col-title"><div class="slds-media"><div class="slds-media__figure">' +
            icon('standard', ic, 'slds-icon_medium') + '</div><div class="slds-media__body">' +
            '<div class="slds-page-header__name"><div class="slds-page-header__name-title"><h1>' +
            '<span class="slds-page-header__title slds-truncate">' + title + '</span></h1></div></div>' +
            '<p class="slds-page-header__name-meta">' + meta + '</p></div></div></div>' +
            (actions ? '<div class="slds-page-header__col-actions"><div class="slds-page-header__controls">' + actions + '</div></div>' : '') +
            '</div></div>';
    }

    /* ==================================================================
     * PORTFOLIO
     * ================================================================== */
    var PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };
    function portfolioRows() {
        var f = S.portfolio;
        var q = f.search.trim().toLowerCase();
        var list = D.PROVIDERS.filter(function (p) {
            var ms = !q || p.name.toLowerCase().indexOf(q) >= 0 || p.npi.indexOf(q) >= 0 || p.specialty.toLowerCase().indexOf(q) >= 0;
            return ms && (f.market === 'All' || p.market === f.market) &&
                (f.priority === 'All' || p.priority === f.priority) &&
                (f.assigned === 'All' || p.owner.name === f.assigned);
        });
        list.sort(function (a, b) {
            switch (f.sort) {
                case 'Stars': return b.stars - a.stars;
                case 'Members': return b.members.total - a.members.total;
                case 'Name': return a.name.localeCompare(b.name);
                default: return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
            }
        });
        return list;
    }
    function renderPortfolio() {
        var f = S.portfolio;
        var markets = ['All'].concat(D.PROVIDERS.map(function (p) { return p.market; }).filter(uniq));
        var owners = ['All'].concat(D.PROVIDERS.map(function (p) { return p.owner.name; }).filter(uniq));
        var header = pageHeader('household', 'Provider Portfolio',
            D.MARKET_LABEL + ' \u00b7 ' + D.PROVIDERS.length + ' assigned accounts',
            '<div class="slds-page-header__control"><ul class="slds-page-header__detail-row">' +
            '<li class="slds-page-header__detail-block kpi kpi-red"><div class="kpi-num">2</div><p class="slds-text-title">High Priority Cases</p></li>' +
            '<li class="slds-page-header__detail-block kpi kpi-green"><div class="kpi-num">5</div><p class="slds-text-title">High Priority Action Items</p></li>' +
            '</ul></div>');

        var filters = card('', '<div class="filter-grid">' +
            '<div class="fg-search"><label class="f-label">Search</label>' +
            '<div class="search-box">' + icon('utility', 'search', 'search-ico slds-icon_xx-small') +
            '<input class="search-input" data-f="p_search" type="text" placeholder="Search providers, NPI, specialty\u2026" value="' + esc(f.search) + '"></div></div>' +
            sel('p_market', 'Market', f.market, opts(markets)) +
            sel('p_priority', 'Priority', f.priority, opts(['All', 'High', 'Medium', 'Low'])) +
            sel('p_assigned', 'Assigned To', f.assigned, opts(owners)) +
            sel('p_sort', 'Sort By', f.sort, opts(['Priority', 'Stars', 'Members', 'Name'])) +
            '</div>', '', 'filter-card');

        var rows = portfolioRows().map(function (p) {
            var tone = D.starTone(p.stars);
            return '<tr class="prow" data-pid="' + p.id + '">' +
                '<td class="col-provider"><div class="prov-name">' + p.name + '</div><div class="prov-meta">NPI ' + p.npi + ' \u00b7 ' + p.type + '</div></td>' +
                '<td>' + p.market + '</td>' +
                '<td><div class="owner"><span class="avatar" style="background:' + p.owner.color + '">' + p.owner.initials + '</span>' +
                '<div><div class="owner-name">' + p.owner.name + '</div><div class="owner-role">' + p.owner.role + '</div></div></div></td>' +
                '<td><span class="pri pri-' + p.priority.toLowerCase() + '"><span class="dot"></span>' + p.priority + '</span></td>' +
                '<td class="ta-right members">' + p.members.total.toLocaleString() + '</td>' +
                '<td><div class="lob"><span class="lob-pill lob-mc">Medicare ' + p.members.mc.toLocaleString() + '</span>' +
                '<span class="lob-pill lob-md">Medicaid ' + p.members.md.toLocaleString() + '</span></div></td>' +
                '<td class="ta-center"><span class="eng-badge">' + p.engagement + '</span></td>' +
                '<td><span class="stars stars-' + tone + '">' + p.stars.toFixed(1) + '</span><span class="stars-max"> / 5.0</span></td>' +
                '<td class="ta-center"><span class="num' + (p.cases > 0 ? '' : ' muted') + '">' + p.cases + '</span></td>' +
                '<td class="ta-center"><span class="num">' + p.actionPlans + '</span></td>' +
                '<td><div class="le-date">' + p.lastEngagement.date + '</div><div class="le-ago">' + p.lastEngagement.ago + '</div></td>' +
                '<td><span class="slds-badge contract-badge">' + p.contract + '</span></td></tr>';
        }).join('');

        var th = ['Provider / NPI', 'Market', 'Owner', 'Priority', 'Members', 'Line of Business', 'Engagement', 'Stars', 'Cases', 'Action Plans', 'Last Engagement', 'Contract'];
        var table = card('', '<div class="slds-scrollable_x"><table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped ptable"><thead><tr class="slds-line-height_reset">' +
            th.map(function (t, i) { return '<th class="slds-text-title_caps' + (i === 0 ? ' col-provider' : '') + '"><div class="slds-truncate">' + t + '</div></th>'; }).join('') +
            '</tr></thead><tbody>' + rows + '</tbody></table></div>',
            '', '') +
            '<p class="result-label">1\u2013' + portfolioRows().length + ' of ' + D.PROVIDERS.length + ' accounts</p>';

        return '<div class="page pg-portfolio">' + header + filters + table + '</div>';
    }

    /* ==================================================================
     * MY CASES
     * ================================================================== */
    function renderCases() {
        var f = S.cases;
        var rows = D.CASES.filter(function (c) {
            return (f.status === 'All' || c.status === f.status) && (f.priority === 'All' || c.priority === f.priority);
        });
        var filters = '<div class="slds-page-header__control filters">' +
            sel('c_status', 'Status', f.status, opts(['All', 'Open', 'In Progress'])) +
            sel('c_priority', 'Priority', f.priority, opts(['All', 'High', 'Medium', 'Low'])) +
            sel('c_assigned', 'Assigned To', f.assigned, [{ label: 'All', value: 'All' }, { label: 'Me', value: 'Me' }]) + '</div>';
        var header = pageHeader('case', 'My Cases', 'Open cases across your provider portfolio', filters);
        var body = rows.map(function (c) {
            return '<tr class="crow" data-pid="' + c.pid + '">' +
                '<td class="col-case"><div class="case-summary">' + c.summary + '</div><div class="case-sub">' + c.sub + '</div></td>' +
                '<td><div class="prov-name">' + c.provider + '</div><div class="prov-meta">' + c.market + '</div></td>' +
                '<td class="cell-type">' + c.type + '</td>' +
                '<td><span class="slds-badge pri-badge pri-' + c.priority.toLowerCase() + '">' + c.priority + '</span></td>' +
                '<td><span class="slds-badge status-badge status-' + c.status.replace(/\s+/g, '-').toLowerCase() + '">' + c.status + '</span></td>' +
                '<td class="ta-center num">' + c.age + '</td><td class="cell-ref">' + c.ref + '</td></tr>';
        }).join('');
        var th = ['Case', 'Provider', 'Type', 'Priority', 'Status', 'Age', 'Case Ref'];
        var table = card('', '<div class="slds-scrollable_x"><table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped ctable"><thead><tr class="slds-line-height_reset">' +
            th.map(function (t, i) { return '<th class="slds-text-title_caps' + (i === 0 ? ' col-case' : '') + (t === 'Age' ? ' ta-center' : '') + '"><div class="slds-truncate">' + t + '</div></th>'; }).join('') +
            '</tr></thead><tbody>' + body + '</tbody></table></div>') +
            '<p class="result-label">' + rows.length + ' of ' + D.CASES.length + ' open cases</p>';
        return '<div class="page pg-cases">' + header + table + '</div>';
    }

    /* ==================================================================
     * MY ACTION PLANS
     * ================================================================== */
    function renderPlans() {
        var f = S.plans;
        var filters = '<div class="slds-page-header__control filters">' +
            sel('a_status', 'Status', f.status, opts(['All', 'Active', 'Complete'])) +
            sel('a_category', 'Category', f.category, opts(['All', 'Performance', 'Quality', 'Contracting'])) +
            sel('a_assigned', 'Assigned To', f.assigned, [{ label: 'All', value: 'All' }, { label: 'Me', value: 'Me' }]) + '</div>';
        var header = pageHeader('task2', 'My Action Plans', 'Structured improvement plans across your provider portfolio', filters);
        var groups = D.ACTION_PLAN_GROUPS.map(function (g) {
            var plans = g.plans.filter(function (p) {
                return (f.category === 'All' || p.category === f.category) && (f.status === 'All' || p.status === f.status);
            });
            if (!plans.length) return '';
            var cards = plans.map(function (p) {
                return '<div class="plan-card"><div class="plan-top"><div class="plan-titles">' +
                    '<span class="plan-title">' + p.title + '</span>' +
                    '<span class="slds-badge status-active">' + p.status + '</span>' +
                    '<span class="slds-badge cat-badge cat-' + p.category.toLowerCase() + '">' + p.category + '</span></div>' +
                    '<a class="view-link" data-pid="' + g.pid + '">View details &rarr;</a></div>' +
                    '<p class="plan-desc">' + p.desc + '</p><div class="plan-foot">' +
                    '<div class="prog-wrap"><div class="prog-label"><span>Progress</span><span class="prog-pct">' + p.progress + '%</span></div>' +
                    '<div class="prog-bar"><div class="prog-fill" style="width:' + p.progress + '%"></div></div></div>' +
                    '<div class="plan-meta"><span>' + p.milestones + '</span><span class="dot-sep">\u00b7</span><span>Owner: ' + p.owner +
                    '</span><span class="dot-sep">\u00b7</span><span>Due ' + p.due + '</span></div></div></div>';
            }).join('');
            return '<div class="grp"><p class="grp-head">' + g.group + '</p>' + cards + '</div>';
        }).join('');
        return '<div class="page pg-plans">' + header + groups + '</div>';
    }

    /* ==================================================================
     * BOOK OF BUSINESS
     * ================================================================== */
    function bobTone(kind, v) {
        var n = parseFloat(v);
        if (kind === 'star') return n >= 3.5 ? 'good' : n >= 3.0 ? 'warn' : 'bad';
        if (kind === 'hedis') return n >= 3.0 ? 'good' : n >= 2.5 ? 'warn' : 'bad';
        if (kind === 'er') return n >= 600 ? 'bad' : n >= 450 ? 'warn' : 'good';
        if (kind === 'pct') return n >= 75 ? 'good' : n >= 60 ? 'warn' : 'bad';
        return 'good';
    }
    function bobCells(r, isBook) {
        function c(kind, cls, v) { return '<td class="ta-right"><span class="num ' + cls + '-' + bobTone(kind, v) + '">' + v + '</span></td>'; }
        return c('star', 'star', r.overall) + c('hedis', 'star', r.hedis) + c('star', 'star', r.ptSafety) +
            c('pct', 'pct', r.pe) + c('pct', 'pct', r.pcp) + c('pct', 'pct', r.aw) + c('pct', 'pct', r.redoc) +
            '<td class="ta-right num">' + r.acute + '</td>' + c('er', 'er', r.er) +
            '<td class="ta-right num">' + r.cwmor + '</td><td class="ta-right num">' + r.totalmor + '</td><td class="ta-right num">' + r.gdr + '</td>' +
            '<td>' + (r.level ? '<span class="slds-badge lvl-badge lvl-' + r.level.replace(/\s+/g, '-').toLowerCase() + '">' + r.level + '</span>' : '\u2014') + '</td>' +
            '<td class="num-muted">' + (r.lastContact || '\u2014') + '</td>';
    }
    function renderBook() {
        var b = D.BOOK_OF_BUSINESS, f = S.book;
        var head = '<div class="bob-header"><div><h1 class="bob-title">Book of Business Report</h1><p class="bob-sub">' + b.meta.subtitle + '</p></div>' +
            '<div class="bob-meta"><p>' + b.meta.refreshed + '</p><p>' + b.meta.frequency + '</p><p class="bob-sources">' + b.meta.sources + '</p></div></div>';
        var kpis = '<div class="kpi-row">' + b.kpis.map(function (k) {
            return '<div class="bob-kpi' + (k.tone === 'brand' ? ' bob-kpi-brand' : '') + '"><div class="bob-kpi-num tone-' + k.tone + '">' + k.value + '</div><div class="bob-kpi-label">' + k.label + '</div></div>';
        }).join('') + '</div>';
        var dist = '<div class="dist-card"><span class="dist-title">Stars Distribution</span><div class="dist-bars">' +
            b.distribution.map(function (d) { return '<div class="dist-item"><span class="dist-count">' + d.count + '</span><span class="dist-seg dist-' + d.tone + '"></span><span class="dist-label">' + d.label + '</span></div>'; }).join('') +
            '</div><div class="dist-avgs">' + b.averages.map(function (a) { return '<div class="avg-item"><span class="avg-label">' + a.label + '</span><span class="avg-val">' + a.value + '</span></div>'; }).join('') + '</div></div>';
        var rowsData = b.rows.filter(function (r) {
            return (!f.search || r.name.toLowerCase().indexOf(f.search.toLowerCase()) >= 0) && (f.engagement === 'All' || r.level === f.engagement);
        });
        var filters = '<div class="filters-row"><div class="search-box"><label class="slds-assistive-text">Search</label>' +
            icon('utility', 'search', 'search-ico slds-icon_xx-small') +
            '<input class="search-input" data-f="b_search" type="text" placeholder="Search providers\u2026" value="' + esc(f.search) + '"></div>' +
            sel('b_market', 'Market', f.market, [{ label: 'All Markets', value: 'All' }].concat(opts(['Georgia', 'North Carolina', 'Virginia']))) +
            sel('b_state', 'State', f.state, [{ label: 'All States', value: 'All' }].concat(opts(['GA', 'NC', 'VA']))) +
            sel('b_stars', 'Stars Tier', f.stars, [{ label: 'All Stars', value: 'All' }].concat(opts(['\u2265 4.0', '3.0 - 3.9', '< 3.0']))) +
            sel('b_engagement', 'Engagement', f.engagement, [{ label: 'All Levels', value: 'All' }].concat(opts(['Level 3', 'Level 2', 'Level 1']))) +
            '<span class="count-label">' + rowsData.length + ' of ' + b.rows.length + ' providers</span></div>';

        var groupRow = '<tr class="grp-row"><th class="grp-provider" colspan="2">Provider</th><th class="grp-quality" colspan="6">Quality</th>' +
            '<th class="grp-mra">MRA</th><th class="grp-util" colspan="3">Utilization</th><th class="grp-pharm" colspan="2">Pharmacy</th><th class="grp-eng" colspan="2">Engagement</th></tr>';
        var colRow = '<tr class="col-row"><th class="ta-left">Name</th><th class="ta-right">Patients</th><th class="ta-right">Overall &starf; &darr;</th>' +
            '<th class="ta-right">HEDIS &starf;</th><th class="ta-right">Pt Safety &starf;</th><th class="ta-right">PE Rating</th><th class="ta-right">% PCP Visit</th>' +
            '<th class="ta-right">% AW Visit</th><th class="ta-right">Redoc Rate</th><th class="ta-right">Acute Adm/1K</th><th class="ta-right">ER Visits/1K</th>' +
            '<th class="ta-right">CW MOR</th><th class="ta-right">Total MOR</th><th class="ta-right">GDR</th><th>Level</th><th>Last Contact</th></tr>';
        var bookRow = '<tr class="book-row"><td class="ta-left book-name">' + b.bookRow.name + '</td><td class="ta-right num">' + b.bookRow.patients + '</td>' + bobCells(b.bookRow, true) + '</tr>';
        var body = rowsData.map(function (r) {
            return '<tr class="brow" data-pid="' + r.pid + '"><td class="ta-left"><div class="bp-name">' + r.name + '</div><div class="bp-sub">' + r.sub + '</div></td>' +
                '<td class="ta-right num">' + r.patients + '</td>' + bobCells(r, false) + '</tr>';
        }).join('');
        var table = card('', '<div class="slds-scrollable_x"><table class="slds-table slds-table_bordered bobtable"><thead>' + groupRow + colRow + '</thead><tbody>' + bookRow + body + '</tbody></table></div>');
        return '<div class="page pg-book">' + head + kpis + dist + filters + table + '</div>';
    }

    /* ==================================================================
     * LEADERSHIP DASHBOARD
     * ================================================================== */
    function renderLeadership() {
        var L = D.LEADERSHIP;
        var header = pageHeader('dashboard', 'Leadership Dashboard', 'Portfolio-wide performance, engagement, and risk overview', '');
        var kpis = '<div class="kpi-row">' + L.kpis.map(function (k) {
            return '<div class="ld-kpi"><div class="ld-kpi-label">' + k.label + '</div><div class="ld-kpi-num tone-' + k.tone + '">' + k.value + '</div></div>';
        }).join('') + '</div>';
        var t = L.trend;
        var trendRows = t.rows.map(function (r) {
            return '<div class="trend-row trend-' + (r.dir === 'down' ? 'down' : 'up') + '"><div><div class="trend-name">' + r.name + '</div><div class="trend-sub">' + r.sub + '</div></div>' +
                '<div class="trend-right"><span class="trend-val">' + r.value + '</span><span class="trend-delta ' + (r.dir === 'down' ? 'down' : 'up') + '">' + r.delta + '</span></div></div>';
        }).join('');
        var trend = card('Provider Performance Trend',
            '<div class="ld-stats"><div class="stat-box stat-green"><div class="stat-num">' + t.improving + '</div><div class="stat-lbl">Improving</div></div>' +
            '<div class="stat-box stat-grey"><div class="stat-num">' + t.stable + '</div><div class="stat-lbl">Stable</div></div>' +
            '<div class="stat-box stat-red"><div class="stat-num">' + t.declining + '</div><div class="stat-lbl">Declining</div></div></div>' +
            '<div class="ld-list">' + trendRows + '</div>',
            '<span class="card-note">Stars movement vs. prior measurement</span>');
        var prio = card('Priority Providers',
            L.priority.map(function (p) {
                return '<div class="prio-row" data-pid="' + p.pid + '"><div><div class="prio-name">' + p.name + '</div><div class="prio-sub">' + p.sub + '</div></div>' +
                    '<div class="prio-badges">' + p.badges.map(function (b) { return '<span class="slds-badge pbadge pbadge-' + b.toLowerCase() + '">' + b + '</span>'; }).join('') + '</div></div>';
            }).join(''), '<span class="card-note">Accounts needing attention</span>', 'slds-m-top_small');
        var dh = L.dataHealth;
        var dataHealth = card('Data Health',
            '<div class="dh-score">' + dh.score + '%</div><div class="dh-label">' + dh.label + '</div>' +
            '<div class="dh-bar"><div class="dh-fill" style="width:' + dh.score + '%"></div></div><div class="dh-rows">' +
            dh.rows.map(function (r) { return '<div class="dh-row"><span class="dh-row-label">' + r.label + '</span><span class="dh-row-val">' + r.value + '</span></div>'; }).join('') +
            '</div><div class="dh-alert">\u26a0 ' + dh.alert + '</div>');
        var mem = card('Membership by Account',
            L.membership.map(function (m) {
                return '<div class="mem-row"><div class="mem-top"><span class="mem-name">' + m.name + '</span><span class="mem-val">' + m.value.toLocaleString() + '</span></div>' +
                    '<div class="mem-bar"><div class="mem-fill" style="width:' + m.pct + '%"></div></div></div>';
            }).join(''), '', 'slds-m-top_small');
        var tableRows = L.table.map(function (r) {
            var tone = parseFloat(r.stars) >= 3.5 ? 'good' : parseFloat(r.stars) >= 3.0 ? 'warn' : 'bad';
            return '<tr class="ldrow" data-pid="' + r.pid + '"><td class="ld-name">' + r.name + '</td><td class="ld-muted">' + r.sub + '</td>' +
                '<td class="ta-center"><span class="num star-' + tone + '">' + r.stars + '</span></td>' +
                '<td class="ta-center num">' + r.cases + '</td><td class="ta-center num">' + r.actions + '</td>' +
                '<td><span class="slds-badge lvl-' + r.engagement.replace(/\s+/g, '-').toLowerCase() + '">' + r.engagement + '</span></td>' +
                '<td><span class="slds-badge risk-' + r.risk.toLowerCase() + '">' + r.risk + '</span></td></tr>';
        }).join('');
        var th = ['Provider', 'Market', 'Stars', 'Open Cases', 'Action Plans', 'Engagement', 'Risk'];
        var table = card('Provider Performance by Account',
            '<div class="slds-scrollable_x"><table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped ldtable"><thead><tr class="slds-line-height_reset">' +
            th.map(function (x) { return '<th class="slds-text-title_caps' + (['Stars', 'Open Cases', 'Action Plans'].indexOf(x) >= 0 ? ' ta-center' : '') + '"><div class="slds-truncate">' + x + '</div></th>'; }).join('') +
            '</tr></thead><tbody>' + tableRows + '</tbody></table></div>', '', 'slds-m-top_small');
        return '<div class="page pg-leadership">' + header + kpis +
            '<div class="ld-grid"><div class="ld-col-main">' + trend + prio + '</div><div class="ld-col-side">' + dataHealth + mem + '</div></div>' + table + '</div>';
    }

    /* ==================================================================
     * COVERAGE MAP
     * ================================================================== */
    function renderCoverage() {
        var C = D.COVERAGE, covered = C.coveredStates, selCode = S.coverage.selected;
        var header = pageHeader('service_territory', 'Coverage Map', 'Geographic distribution of top-level provider accounts',
            '<div class="slds-page-header__control filters">' +
            sel('cov_contact', 'Contact', 'All', [{ label: 'All Contacts', value: 'All' }, { label: 'Sarah Chen', value: 'Sarah Chen' }, { label: 'David Park', value: 'David Park' }, { label: 'Dana Osei', value: 'Dana Osei' }, { label: 'James Whitfield', value: 'James Whitfield' }], true) +
            sel('cov_market', 'Market', selCode || 'All', [{ label: 'All Markets', value: 'All' }, { label: 'Georgia', value: 'GA' }, { label: 'North Carolina', value: 'NC' }, { label: 'Virginia', value: 'VA' }], true) +
            '</div>');
        var kpis = '<div class="kpi-row">' + C.kpis.map(function (k) {
            return '<div class="cov-kpi"><div class="cov-kpi-label">' + k.label + '</div><div class="cov-kpi-num' + (k.tone === 'brand' ? ' brand' : '') + '">' + k.value + '</div></div>';
        }).join('') + '</div>';
        var paths = D.US_STATES.map(function (s) {
            var isCov = covered.indexOf(s.code) >= 0, isSel = selCode === s.code;
            var cls = 'st' + (isCov ? ' st-cov' : '') + (isSel ? ' st-sel' : '');
            return '<path d="' + s.d + '" class="' + cls + '" data-code="' + s.code + '"><title>' + s.name + '</title></path>';
        }).join('');
        var pins = C.pins.map(function (p) { return '<circle cx="' + p.cx + '" cy="' + p.cy + '" r="7" class="pin"></circle>'; }).join('');
        var reset = selCode ? '<button class="reset-btn" data-reset="1">\u21bb Reset \u00b7 ' + stateName(selCode) + '</button>' : '';
        var mapCard = card('', '<div class="map-wrap"><div class="legend">' +
            '<span class="lg"><span class="lg-sw sw-cov"></span>State with coverage</span>' +
            '<span class="lg"><span class="lg-sw sw-no"></span>No coverage</span>' +
            '<span class="lg"><span class="lg-dot"></span>Provider city cluster</span></div>' + reset +
            '<div class="map-area"><svg viewBox="' + D.US_MAP_VIEWBOX + '" class="map-svg" preserveAspectRatio="xMidYMid meet"><g class="states">' + paths + '</g><g class="pins">' + pins + '</g></svg></div>' +
            '<div class="zoom-ctrls"><button class="zbtn">+</button><button class="zbtn">\u2212</button><button class="zbtn" data-reset="1">\u21bb</button></div></div>', '', 'map-card');

        var states = C.states.filter(function (s) { return !selCode || s.code === selCode; }).map(function (s) {
            return '<div class="state-row' + (selCode === s.code ? ' sel' : '') + '"><div class="state-top"><div><span class="state-code">' + s.code + '</span><div class="state-accts">' + s.accounts + '</div></div>' +
                '<div class="state-mem"><strong>' + s.members + '</strong> members</div></div><div class="pill-row"><span class="pill pill-mc">' + s.mc + '</span><span class="pill pill-md">' + s.md + '</span></div></div>';
        }).join('');
        var cities = C.cities.filter(function (c) { return !selCode || c.st === selCode; }).map(function (c) {
            return '<div class="city-card"><div class="city-top"><span class="city-name">' + c.city + '</span><span class="city-count">' + c.count + '</span></div>' +
                '<div class="city-market">' + c.market + '</div><div class="pill-row"><span class="pill pill-mc">' + c.mc + '</span><span class="pill pill-md">' + c.md + '</span></div>' +
                '<div class="city-accts">' + c.accounts.map(function (a) { return '<a class="city-acct" data-pid="' + a.pid + '"><span class="acct-dot"></span>' + a.name + '</a>'; }).join('') + '</div></div>';
        }).join('');
        var side = '<div class="side">' + card('States with Coverage', states) + card('Cities / Markets', cities, '', 'slds-m-top_small') + '</div>';
        return '<div class="page pg-coverage">' + header + kpis + '<div class="cov-grid">' + mapCard + side + '</div></div>';
    }

    /* ==================================================================
     * PROVIDER DETAIL
     * ================================================================== */
    var PRODUCTS = [
        ['Coverage Finder', 'live'], ['ID Card Exchange (Digital ID)', 'live'], ['Medical Authorizations (eMPA)', 'opp'],
        ['Medical Record Retrieval (MRR)', 'live'], ['Real Time Pharmacy Benefits (RTPB)', 'impl'], ['Admissions, Discharge & Transfers (ADT)', 'opp'],
        ['ADT Forwarding', 'no'], ['POC Alerts - HPCS', 'impl'], ['Additional Details Request (ADR)', 'no'], ['CDE', 'no'],
        ['Claims Exchange', 'opp'], ['Claims Status', 'live'], ['Clinical Analytics Document (CAnD)', 'no'], ['Electronic Practitioner Assessment Form (ePAF)', 'no'],
        ['Health Plan Clinical', 'no'], ['Networks & Ratings (NRX)', 'no'], ['Point of Care Alerts (POCA)', 'opp'], ['POCA - Care Gap Exchange (CGX)', 'no'],
        ['POCA - CDS Hooks', 'no'], ['Scheduled Appointments', 'no'], ['Social Determinants of Health (SDOH)', 'no'], ['Supp Data Flat File', 'no'], ['Supplemental Data', 'live']
    ];
    function fieldItem(label, value, cls) { return '<div class="' + (cls || 'field-item') + '"><p class="field-label">' + label + '</p><p class="field-value">' + (value == null ? '' : value) + '</p></div>'; }
    function snapRow(label, value, extra) { return '<div class="snap-row"><span class="snap-label">' + label + '</span><span class="snap-value ' + (extra || '') + '">' + value + '</span></div>'; }
    function detailTab(id, label, badge) {
        var active = S.detailTab === id;
        return '<li class="slds-tabs_default__item' + (active ? ' slds-is-active' : '') + '" role="presentation">' +
            '<a class="slds-tabs_default__link" role="tab" data-tab="' + id + '">' + label + (badge != null ? ' <span class="tab-count">' + badge + '</span>' : '') + '</a></li>';
    }
    function renderDetail(id) {
        var d = D.getDetail(id), p = d.provider;
        var tone = D.starTone(p.stars);
        var crumbs = '<div class="crumbs"><a class="crumb-link" data-nav="#/portfolio">Providers</a><span class="crumb-sep">/</span><span class="crumb-cur">' + p.name + '</span></div>';
        var badges = (d.badges || []).map(function (b) { return '<span class="chip-badge">' + b + '</span>'; }).join('');
        var recHeader = '<div class="slds-page-header slds-page-header_record-home rec-header"><div class="slds-page-header__row">' +
            '<div class="slds-page-header__col-title"><div class="slds-media"><div class="slds-media__figure">' + icon('standard', 'account', 'slds-icon_medium') + '</div>' +
            '<div class="slds-media__body"><div class="slds-page-header__name"><div class="slds-page-header__name-title"><h1>' +
            '<span class="slds-page-header__title slds-truncate title-big">' + p.name + '</span></h1></div>' +
            '<span class="pri pri-' + p.priority.toLowerCase() + '"><span class="dot"></span>' + p.priority + ' Priority</span>' +
            (d.nonStdContract ? '<span class="warn-badge">\u26a0 Non-Std Contract</span>' : '') + '</div>' +
            '<p class="slds-page-header__name-meta">' + p.specialty + ' \u00b7 ' + p.market + '</p>' +
            '<div class="badge-row"><span class="live-badge"><span class="live-dot"></span>Active</span>' + badges +
            '<span class="meta-inline">NPI ' + p.npi + '</span><span class="meta-inline">' + d.emr + '</span><span class="meta-inline">Medicare + Medicaid</span></div>' +
            '</div></div></div>' +
            '<div class="slds-page-header__col-actions"><div class="slds-page-header__controls"><div class="slds-page-header__control">' +
            '<div class="slds-button-group"><button class="slds-button slds-button_brand">Log Engagement</button><button class="slds-button slds-button_neutral">Edit</button>' +
            '<button class="slds-button slds-button_icon slds-button_icon-border-filled"><svg class="slds-button__icon" aria-hidden="true"><use xlink:href="' + CDN + 'utility-sprite/svg/symbols.svg#down"></use></svg></button></div>' +
            '</div></div></div></div>' + metricStrip(d, p, tone) + '</div>';

        var tabs = '<ul class="slds-tabs_default__nav" role="tablist">' +
            detailTab('overview', 'Overview') + detailTab('performance', 'Performance') + detailTab('interop', 'Interoperability') +
            detailTab('contracting', 'Contracting') + detailTab('cases', 'Cases', (d.casesList || []).length) + detailTab('plans', 'Action Plans', (d.actionItems || []).length) +
            detailTab('engagement', 'Engagement History') + '</ul>';

        var body = '<div class="tab-body">' + detailTabBody(S.detailTab, d, p) + '</div>';
        return '<div class="page pg-detail">' + crumbs + recHeader +
            '<div class="tab-wrap slds-tabs_default">' + tabs + body + '</div></div>';
    }
    function metricStrip(d, p, tone) {
        var items = [
            ['Open Cases', (d.casesList || []).length, 'metric-val'], ['Action Plans', (d.actionItems || []).length, 'metric-val'],
            ['Last Engagement', p.lastEngagement.ago, 'metric-val'], ['Contract', p.contract, 'metric-val'],
            ['Account Owner', d.accountOwner, 'metric-val link'], ['Next Meeting', d.nextMeeting, 'metric-val']
        ];
        var strip = '<li class="slds-page-header__detail-block"><p class="slds-text-title slds-truncate">Stars Score</p><p class="metric-val stars-' + tone + '">' + p.stars.toFixed(1) + '</p></li>';
        strip += items.map(function (m) { return '<li class="slds-page-header__detail-block"><p class="slds-text-title slds-truncate">' + m[0] + '</p><p class="' + m[2] + '">' + m[1] + '</p></li>'; }).join('');
        return '<div class="slds-page-header__row slds-page-header__row_gutters"><div class="slds-page-header__col-details"><ul class="slds-page-header__detail-row metric-row">' + strip + '</ul></div></div>';
    }
    function detailTabBody(tab, d, p) {
        if (tab === 'overview') return tabOverview(d, p);
        if (tab === 'performance') return tabPerformance(d, p);
        if (tab === 'interop') return tabInterop(d, p);
        if (tab === 'contracting') return tabContracting(d, p);
        if (tab === 'cases') return tabCases(d, p);
        if (tab === 'plans') return tabPlans(d, p);
        if (tab === 'engagement') return tabEngagement(d, p);
        return '';
    }
    function tabOverview(d, p) {
        var pr = d.profile;
        var profile = card('Provider Profile', '<div class="field-grid">' +
            fieldItem('NPI', p.npi) + fieldItem('Tax ID', pr.taxId) + fieldItem('Market', p.market) + fieldItem('Phone', pr.phone) +
            fieldItem('Specialty', p.specialty) + fieldItem('Network Status', pr.networkStatus) + fieldItem('EMR System', d.emr) +
            fieldItem('SDF on File', pr.sdf ? 'Yes' : 'No') + fieldItem('Attestation on File', pr.attestation ? 'Yes' : 'No') +
            fieldItem('Provider Program(s)', (pr.programs || []).join(', ')) + fieldItem('Website', pr.website) + fieldItem('Address', pr.address) + '</div>');
        var hierarchy = card('Provider Hierarchy', '<div class="hierarchy">' + (d.hierarchy || []).map(function (h, i, a) {
            var last = i === a.length - 1;
            return '<span class="hier-item"><span class="hier-pill' + (last ? ' hier-pill-active' : '') + '">' + h + '</span>' + (last ? '' : '<span class="hier-sep">\u203a</span>') + '</span>';
        }).join('') + '</div>', '<a class="mini-link">View Full Hierarchy &rarr;</a>', 'slds-m-top_small');
        var dris = card('Internal DRIs / Contacts', '<div class="dri-grid">' + (d.dris || []).map(function (c) {
            return '<div class="contact-card"><span class="contact-avatar">' + c.initials + '</span><div><p class="contact-role">' + c.role + '</p><p class="contact-name">' + c.name + '</p><p class="contact-email">' + c.email + '</p></div></div>';
        }).join('') + '</div>', '', 'slds-m-top_small');
        var s = d.snapshot;
        var snapshot = card('Account Snapshot',
            snapRow('Membership Volume', p.members.total.toLocaleString()) + snapRow('Medicare', p.members.mc.toLocaleString()) + snapRow('Medicaid', p.members.md.toLocaleString()) +
            snapRow('Engagement Level', p.engagement) + snapRow('Open Cases', p.cases) + snapRow('Open Actions', s.openActions) + snapRow('Overdue Actions', s.overdueActions) +
            snapRow('Pending Commitments', s.pendingCommitments) + snapRow('Stars Score', p.stars.toFixed(1)) + snapRow('Interop Connections', s.interop));
        var green = '<div class="green-card slds-m-top_small"><p class="green-kicker">Next Scheduled Meeting</p><p class="green-big">' + d.nextMeetingPretty + '</p><p class="green-sub">' + d.nextMeetingIn + '</p></div>';
        var ai = '<div class="ai-card slds-m-top_small"><p class="ai-kicker">\u2726 AI Account Summary</p><p class="ai-body">' + d.aiSummary + '</p><div class="ai-tags">' + (d.aiTags || []).map(function (t) { return '<span class="ai-tag">' + t + '</span>'; }).join('') + '</div></div>';
        var cov = card('Coverage Map', '<div class="coverage"><div class="coverage-map">' + icon('utility', 'location', 'slds-icon_small') + '<span class="coverage-city">' + p.market + '</span></div><p class="coverage-meta">' + p.members.total.toLocaleString() + ' members</p></div>', '', 'slds-m-top_small');
        return '<div class="d-grid"><div class="d-main">' + profile + hierarchy + dris + '</div><div class="d-side">' + snapshot + green + ai + cov + '</div></div>';
    }
    function tabPerformance(d, p) {
        if (!d.performance) return '<div class="empty">Performance detail not available for this account in the prototype dataset.</div>';
        var f = d.performance;
        var gapCard = card('Gap Closure Snapshot (Yield)', '<div class="d-stats"><div class="stat-box stat-red"><div class="stat-num">' + f.openGaps + '</div><div class="stat-lbl">Open Gaps</div></div>' +
            '<div class="stat-box stat-green"><div class="stat-num">' + f.gapsClosedYtd + '</div><div class="stat-lbl">Gaps Closed YTD</div></div>' +
            '<div class="stat-box stat-grey"><div class="stat-num">' + f.closureRate + '</div><div class="stat-lbl">Closure Rate</div></div></div>');
        var um = card('Utilization Management', '<div class="d-stats"><div class="stat-box stat-plain"><div class="stat-num">' + f.admitsPer1k + '</div><div class="stat-lbl">Admits / 1,000</div></div>' +
            '<div class="stat-box stat-plain"><div class="stat-num">' + f.edRate + '</div><div class="stat-lbl">ED Utilization Rate</div></div>' +
            '<div class="stat-box stat-plain"><div class="stat-num">' + f.avoidableCare + '</div><div class="stat-lbl">Avoidable Care</div></div></div>' +
            '<div class="flag-row">\u2691 1 flag requiring provider outreach or operational intervention</div>', '', 'slds-m-top_small');
        var gaps = card('Stars Gap Analysis', (f.gaps || []).map(function (g) {
            return '<div class="gap-block"><div class="gap-head"><span class="gap-name">' + g.name + '</span><span class="gap-tag ' + (g.kind === 'Data Gap' ? 'gap-data' : 'gap-care') + '">' + g.kind + '</span>' +
                '<span class="gap-target">' + g.from + ' \u2192 ' + g.to + '</span></div><div class="gap-bar"><div class="gap-fill" style="width:' + g.to + '"></div></div><p class="gap-open">' + g.open + '</p></div>';
        }).join(''), '', 'slds-m-top_small');
        var feeds = card('Data Feeds / Connections', snapRow('EMR System', 'Epic', 'green') + snapRow('Supplemental Data Feed', 'Active', 'green') + snapRow('Attestation', 'On file', 'green'));
        var follow = card('Outstanding Follow-Ups', '<ul class="follow-list"><li>James to share pharmacy partnership information</li><li>Provider to explore automated refill reminder workflows</li></ul>', '', 'slds-m-top_small');
        return '<div class="d-grid"><div class="d-main">' + gapCard + um + gaps + '</div><div class="d-side">' + feeds + follow + '</div></div>';
    }
    function tabInterop(d, p) {
        if (!d.interop) return '<div class="empty">Interoperability profile not available for this account in the prototype dataset.</div>';
        var it = d.interop;
        var profile = card('Technology & Connectivity Profile',
            '<div class="interop-top">' + fieldItem('EMR Vendor', '<span class="field-value strong">' + it.vendor + '</span><span class="field-sub">' + it.version + '</span>') +
            fieldItem('Patient Portal', '<span class="field-value strong">' + it.portal + '</span>') +
            fieldItem('IT Vendor Contact', '<span class="field-value strong">' + it.itContact.name + '</span><span class="field-sub">' + it.itContact.email + '</span>') + '</div>' +
            '<div class="std-chips">' + it.standards.map(function (s) { return '<div class="std-chip"><span class="std-check">\u2713</span><div><p class="std-name">' + s.name + '</p><p class="std-detail">' + s.detail + '</p></div></div>'; }).join('') + '</div>' +
            '<div class="assess-note"><strong>Assessment Note:</strong> ' + it.note + '</div>');
        var legend = '<div class="legend2"><span class="lg2"><span class="prod-dot prod-live"></span>Live</span><span class="lg2"><span class="prod-dot prod-impl"></span>Implementation</span>' +
            '<span class="lg2"><span class="prod-dot prod-opp"></span>Opportunity</span><span class="lg2"><span class="prod-dot prod-no"></span>No Connection</span></div>';
        var grid = '<div class="prod-grid">' + PRODUCTS.map(function (x) { return '<div class="prod-item"><span class="prod-dot prod-' + x[1] + '"></span>' + x[0] + '</div>'; }).join('') + '</div>';
        var products = card('Product Connectivity', legend + grid, '', 'slds-m-top_small');
        return profile + products;
    }
    function tabContracting(d, p) {
        if (!d.contract) return '<div class="empty">Contract detail not available for this account in the prototype dataset.</div>';
        var c = d.contract;
        var summary = card('Contract Summary', '<div class="field-grid third">' +
            fieldItem('Status', '<span class="slds-badge contract-badge">' + p.contract + '</span>') + fieldItem('Contract Parts', c.parts) + fieldItem('Expiration Date', c.expiry) +
            fieldItem('Assigned Contractor', c.contractor) + fieldItem('Care Coord. Fee', c.fee) + fieldItem('Load Status', c.loadStatus) + '</div>' +
            (c.warning ? '<div class="assess-note warn">\u26a0 ' + c.warning + '</div>' : ''));
        var fee = card('TIN-Level Fee Schedule', '<table class="slds-table slds-table_cell-buffer slds-table_bordered"><thead><tr class="slds-line-height_reset">' +
            '<th class="slds-text-title_caps">TIN</th><th class="slds-text-title_caps">Group Name</th><th class="slds-text-title_caps">Fee Type</th><th class="slds-text-title_caps">Amount</th></tr></thead>' +
            '<tbody><tr><td>' + c.tin + '</td><td>' + p.name + '</td><td>Care Coordination Fee</td><td>' + c.fee + '</td></tr></tbody></table>', '', 'slds-m-top_small');
        var renewal = card('Renewal Timeline', '<p class="renew-big">' + c.renewalDays + '</p><p class="renew-sub">until contract expiration</p>');
        var team = card('Contracting Team', '<div class="contact-card"><span class="contact-avatar">' + (c.contractor ? c.contractor.charAt(0) : '') + '</span><div><p class="contact-name">' + c.contractor + '</p></div></div>', '', 'slds-m-top_small');
        return '<div class="d-grid"><div class="d-main">' + summary + fee + '</div><div class="d-side">' + renewal + team + '</div></div>';
    }
    function tabCases(d, p) {
        var list = d.casesList || [];
        if (!list.length) return '<div class="empty">No cases logged for this account.</div>';
        return list.map(function (c) {
            return card(c.ref, '<p class="case-summary">' + c.summary + '</p><div class="case-meta"><span><strong>Queue:</strong> ' + c.queue + '</span><span><strong>Submitted:</strong> ' + c.submitted + '</span><span><strong>Age:</strong> ' + c.age + '</span></div>',
                '<span class="chip-badge">' + c.type + '</span><span class="status-badge status-prog">' + c.status + '</span><span class="status-badge status-med">' + c.priority + '</span>');
        }).join('');
    }
    function tabPlans(d, p) {
        var list = d.actionItems || [];
        if (!list.length) return '<div class="empty">No action items for this account in the prototype dataset.</div>';
        return list.map(function (a) {
            var prog = (a.progress != null) ? '<div class="ap-prog"><div class="ap-prog__bar"><div class="ap-prog__fill" style="width:' + a.progress + '%"></div></div><span class="ap-prog__txt">' + a.progress + '%' + (a.milestones ? ' \u00b7 ' + a.milestones : '') + '</span></div>' : '';
            return card('', '<div class="action-item"><div class="action-head"><span class="chip-badge">' + a.tag + '</span><span class="action-title">' + a.title + '</span>' +
                '<span class="status-badge status-plain">' + a.status + '</span><span class="status-badge status-med">' + a.priority + '</span></div>' +
                '<p class="action-desc">' + a.desc + '</p>' + prog + '<div class="action-meta"><span class="mini-avatar">' + (a.owner ? a.owner.charAt(0) : '') + '</span><span>' + a.owner + '</span><span>Due: ' + a.due + '</span><span class="chip-badge">' + a.cat + '</span></div></div>');
        }).join('');
    }
    function tabEngagement(d, p) {
        var list = d.engagements || [];
        if (!list.length) return '<div class="empty">No engagement history for this account in the prototype dataset.</div>';
        return list.map(function (e) {
            return card(e.title, '<p class="field-label">Attendees</p><div class="attendees">' + (e.attendees || []).map(function (a) { return '<span class="chip-badge">' + a + '</span>'; }).join('') + '</div>' +
                '<p class="field-label mt">Notes</p><p class="field-value">' + e.notes + '</p>' +
                '<p class="field-label mt">Commitments</p><ul class="follow-list">' + (e.commitments || []).map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul>' +
                '<p class="field-label mt">Outcomes</p><ul class="follow-list check">' + (e.outcomes || []).map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul>',
                '<span class="meta-inline">' + e.meta + '</span>');
        }).join('');
    }

    /* ---------------- util ---------------- */
    function uniq(v, i, a) { return a.indexOf(v) === i; }
    function esc(s) { return (s || '').replace(/"/g, '&quot;'); }
    function stateName(code) { var s = D.COVERAGE.states.find(function (x) { return x.code === code; }); return s ? s.name : ''; }

    /* ---------------- router + bind ---------------- */
    function currentRoute() {
        var h = location.hash || '#/portfolio';
        var m = h.match(/^#\/provider\/(.+)$/);
        if (m) return { page: 'detail', id: decodeURIComponent(m[1]) };
        var id = h.replace('#/', '');
        return { page: id || 'portfolio' };
    }
    function renderTabs(activeId) {
        var ul = document.getElementById('lx-tabs');
        ul.innerHTML = TABS.map(function (t) {
            return '<li class="lx-tab' + (t.id === activeId ? ' is-active' : '') + '"><a href="' + t.route + '">' +
                t.label + '</a></li>';
        }).join('');
    }
    function render() {
        var active = document.activeElement;
        var fname = active && active.dataset ? active.dataset.f : null;
        var caret = fname && active.selectionStart != null ? active.selectionStart : null;
        var r = currentRoute();
        var html, activeTab = r.page;
        switch (r.page) {
            case 'coverage': html = renderCoverage(); break;
            case 'cases': html = renderCases(); break;
            case 'plans': html = renderPlans(); break;
            case 'book': html = renderBook(); break;
            case 'leadership': html = renderLeadership(); break;
            case 'detail': html = renderDetail(r.id); activeTab = null; break;
            default: html = renderPortfolio(); activeTab = 'portfolio';
        }
        app.innerHTML = html;
        renderTabs(activeTab);
        window.scrollTo(0, 0);
        if (fname) {
            var nn = app.querySelector('[data-f="' + fname + '"]');
            if (nn) { nn.focus(); if (caret != null && nn.setSelectionRange) { try { nn.setSelectionRange(caret, caret); } catch (e) {} } }
        }
    }

    /* delegated events */
    app.addEventListener('click', function (e) {
        var nav = e.target.closest('[data-nav]');
        if (nav) { location.hash = nav.getAttribute('data-nav'); return; }
        var reset = e.target.closest('[data-reset]');
        if (reset) { S.coverage.selected = null; render(); return; }
        var st = e.target.closest('path.st');
        if (st) { var code = st.getAttribute('data-code'); if (D.COVERAGE.coveredStates.indexOf(code) >= 0) { S.coverage.selected = S.coverage.selected === code ? null : code; render(); } return; }
        var tab = e.target.closest('[data-tab]');
        if (tab) { S.detailTab = tab.getAttribute('data-tab'); render(); return; }
        var pidEl = e.target.closest('[data-pid]');
        if (pidEl) { var pid = pidEl.getAttribute('data-pid'); if (pid) location.hash = '#/provider/' + encodeURIComponent(pid); return; }
    });
    app.addEventListener('input', function (e) {
        var f = e.target.dataset ? e.target.dataset.f : null;
        if (f === 'p_search') { S.portfolio.search = e.target.value; render(); }
        else if (f === 'b_search') { S.book.search = e.target.value; render(); }
    });
    app.addEventListener('change', function (e) {
        var f = e.target.dataset ? e.target.dataset.f : null, v = e.target.value;
        if (!f) return;
        var map = {
            p_market: ['portfolio', 'market'], p_priority: ['portfolio', 'priority'], p_assigned: ['portfolio', 'assigned'], p_sort: ['portfolio', 'sort'],
            c_status: ['cases', 'status'], c_priority: ['cases', 'priority'], c_assigned: ['cases', 'assigned'],
            a_status: ['plans', 'status'], a_category: ['plans', 'category'], a_assigned: ['plans', 'assigned'],
            b_market: ['book', 'market'], b_state: ['book', 'state'], b_stars: ['book', 'stars'], b_engagement: ['book', 'engagement']
        };
        if (map[f]) { S[map[f][0]][map[f][1]] = v; render(); return; }
        if (f === 'cov_market') { S.coverage.selected = v === 'All' ? null : v; render(); return; }
    });

    window.addEventListener('hashchange', function () { S.detailTab = 'overview'; render(); });
    render();
})();
