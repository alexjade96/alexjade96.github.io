<script>

</script>

<!--<PageTitle>About</PageTitle>-->

<section class="about">
    <h1>Simplistic About-Me</h1>
    <p>
        I'm using this website to work on & learn various technologies recommended to me, as well as begin to finally catalog various projects, thoughts, and ideas I've had over the years.
    </p>
    <p>
        This is a work in progress, I'll be adding more content as I go along.  Below is a rough progression table with a few site-components I'm planning to implement in the future!
    </p>
    <table class="table-auto">
        <caption>To-Do List (Last Updated: 8/28/2025)</caption>
        <thead>
            <tr>
                <th>Feature</th>
                <th>Description</th>
                <th>Potential roadblocks</th>
                <th>Solutions</th>
                <th>Progress</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Leave A Comment</td>
                <td>Adding site-wide comments</td>
                <td>Would require a database to store comment objects which I'm trying to avoid as I'm hosting this on Github Pages - Some preliminary research shows potential to use Github Issues (Utterance?) for this purpose</td>
                <td>Currently using Utterances, thinking about sidebar-ing instead of dropping them in the footer!</td>
                <td>✅</td>
            </tr>
            <tr>
                <td>Style Expansion</td>
                <td>Adding more site components like a sidebar (for menu/comment chaining, etc.)</td>
                <td>Researching, potential conflict with having both top nav/sidebar nav styles?</td>
                <td>In progress</td>
                <td>⏳</td>
            </tr>
            <tr>
                <td>(Resume) Skill Highlighting</td>
                <td>Adding extra flair to showing resume skills/components on the "Resume" page</td>
                <td>Research on CSS/Styling & other svelte-kit add-ons</td>
                <td>In thought phase</td>
                <td>⏳</td>
            </tr>
            <tr>
                <td>Music Display/External API loading?</td>
                <td>One of my future projects involves working with music (e.g. Spotify), maybe can adapt it to here as well?</td>
                <td>Not sure if API calls are feasible for Github Pages, may have to eventually turn to hosting options</td>
                <td>Far Track</td>
                <td>⏳</td>
            </tr>
            <tr>
                <td>Expand on Subtopics (Projects, Ideas, Game Stuff, etc.)</td>
                <td>Planning to add another items to track</td>
                <td>May need to host/redirect to other sites, especially if creating detailed projects</td>
                <td>Far Track</td>
                <td>⏳</td>
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