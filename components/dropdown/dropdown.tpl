<!-- DROPDOWN -->
<div id="dropdown-wrap">
    <div id="dropdown">
        <div data-strapi-dd="sidebar" class="hidden" id="dd-sidebar"></div>
        <div data-strapi-dd="flatLeft" class="hidden" id="dd-flat-left">
            <div data-strapi-dd="flatIcon" class="dd-flat-icon"></div>
            <div>
                <h3 data-strapi-dd="flatTitle"></h3>
                <p data-strapi-dd="flatDesc"></p>
            </div>
        </div>
        <div id="dd-content">
            <div id="dd-top-bar">
                <div data-strapi-dd="panelTitle" class="hidden" id="dd-panel-title"></div>
                <button class="dd-close" onclick="closeDropdown()">&#10005;</button>
            </div>
            <div data-strapi-dd="grid" id="dd-grid"></div>
        </div>
    </div>
</div>
