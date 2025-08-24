<script>
    import { onMount} from 'svelte';
    import PdfViewer from 'svelte-pdf';

    let lastModified = '';
    let width = window.innerWidth;
    let viewerKey = 0;
    let timeout;

    const updateWidth = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            width = window.innerWidth;
            viewerKey += 1;
        }, 200);
    };

    onMount(async () => {
        const response = await fetch('/resume_ayeh.pdf');
        lastModified = response.headers.get('Last-Modified') || 'Unknown';

        if (lastModified) {
            const date = new Date(lastModified);
            lastModified = date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    });
</script>

<section class="resume w-full flex flex-col justify-center items-center mt-4">
    <h1 class="text-2xl font-bold mb-4 ">My Resume</h1>
    <p class="text-sm text-gray-500 mt-4">
        Last updated: {lastModified || 'Unknown'}
    </p>
    <br />
    <p>
        This is my latest (downloadable) resume!  I'm still deciding whether to use an all-inclusive multi-page detailed version, splice out various skills & profeciency levels on this webpage, etc.
    </p>
    <div class="border rounded shadow w-full max-w-[800px]">
        {#key viewerKey}
            <PdfViewer 
                url="/resume_ayeh.pdf"
                scale={1.0}
                showButtons={["navigation","zoom","download","print"]}
            />
        {/key}
    </div>
</section>
