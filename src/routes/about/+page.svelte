<script>

</script>

<!--<PageTitle>About</PageTitle>-->

<section class="about">
    <h1>Simplistic About-Me</h1>
    <p>
        I'm using this website to work on & learn various technologies recommended to me, as well as begin to finally catalog various projects, thoughts, and ideas I've had over the years.
    </p>
    <p>
        This is a work in progress and I will be adding more content as I go along.  Below are a few site-components I'm planning to add in the future!
    </p>
    <table class="table-auto">
        <caption>To-Do Next</caption>
        <thead>
            <tr>
                <th>Last updated: 8-23</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Link to GH (?)</td></tr>
            <tr><td>Add more site features</td></tr>
            <tr><td>Fix styling (Check CSS imports for definitions)</td></tr>
            <tr><td>Expand on Resume/Skill display section</td></tr>
            <tr><td>Research forms/comments</td></tr>
            <tr><td>Add another "Game Stuff" track, or add routing section for Uma</td></tr>
        </tbody>
    </table>
    <table class="table-auto">
        <caption>Components List</caption>
        <thead>
            <tr>
                <th>Feature</th>
                <th>Description</th>
                <th>Potential roadblocks</th>
                <th>Progression/Solutions</th>
                <th>Priorities</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Leave A Comment</td>
                <td>Recommended skills for career mode</td>
                <td>Would require a database to store comment objects which I'm trying to avoid as I'm hosting this on Github Pages</td>
                <td>Some preliminary research shows potential to use Github Issues (Utterance?) for this purpose</td>
                <td>Researching, style to either set at footer or keep on separate page (?)</td>
            </tr>
            <tr>
                <td>Skill Highlighting</td>
                <td>Adding extra flair to showing resume skills/components on the "Resume" page</td>
                <td>Research on CSS/Styling & other svelte-kit add-ons</td>
                <td>In thought phase, TBC</td>
                <td>TBD</td>
            </tr>
            <tr>
                <td>Project Roadmap System</td>
                <td>Going with my Projects & Idea Tracker, having some standard I can use to track my progress on development or research for these would be helpful in the future, especially depending on my activity level</td>
                <td>Needs lots of structuring work to start before attempting an implementation</td>
                <td>In thought phase</td>
                <td>TBD</td>
            </tr>
            <tr>
                <td>Music Display/External API loading?</td>
                <td>One of my future projects involves working with music (e.g. Spotify), maybe can adapt it to here as well?</td>
                <td>Not sure if API calls are feasible for Github Pages, may have to eventually turn to hosting options</td>
                <td>Far Track</td>
                <td>TBD</td>
            </tr>
        </tbody>
    </table>
</section>

<style>
    p {
        margin-block: var(--size-5);
        max-width: 800px;
        margin-inline: auto;
        font-size: var(--size-3);
    }
</style>