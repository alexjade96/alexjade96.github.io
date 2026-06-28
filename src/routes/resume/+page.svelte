<script lang="ts">
	const { data } = $props();
	const { resumeData, lastModified } = data;

	type SkillItem = { category: string; items: string };
	type EduEntry = { degree: string; date: string; institution: string; note: string | null };
	type ExpEntry = { title: string; date: string; subtitle: string; bullets: string[] };

	const eduSection = resumeData.sections.find((s) => s.type === 'education') as
		| { type: 'education'; entries: EduEntry[] }
		| undefined;
	const expSection = resumeData.sections.find((s) => s.type === 'experience') as
		| { type: 'experience'; entries: ExpEntry[] }
		| undefined;
	const skillsSection = resumeData.sections.find((s) => s.type === 'skills') as
		| { type: 'skills'; items: SkillItem[] }
		| undefined;

	type TimelineEntry = {
		kind: 'education' | 'experience';
		title: string;
		subtitle: string;
		date: string;
		sortYear: number;
	};

	function parseSortYear(date: string): number {
		const nums = date.match(/\d{4}/g);
		return nums ? Math.max(...nums.map(Number)) : 0;
	}

	function formatDate(date: string): string {
		return date.replace(/\s*\|\s*/g, ' – ');
	}

	const timelineEntries: TimelineEntry[] = [
		...(expSection?.entries ?? []).map((e) => ({
			kind: 'experience' as const,
			title: e.title,
			subtitle: e.subtitle,
			date: formatDate(e.date),
			sortYear: parseSortYear(e.date),
		})),
		...(eduSection?.entries ?? []).map((e) => ({
			kind: 'education' as const,
			title: e.degree,
			subtitle: e.institution + (e.note ? ` · ${e.note}` : ''),
			date: formatDate(e.date),
			sortYear: parseSortYear(e.date),
		})),
	].sort((a, b) => b.sortYear - a.sortYear);

</script>

<section class="mx-auto flex w-full max-w-[900px] flex-col gap-8 px-4 py-8">
	<!-- Header -->
	<div class="flex w-full items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Resume</h1>
			{#if lastModified}
				<p class="mt-0.5 text-sm text-[var(--text-2)]">Last updated: {lastModified}</p>
			{/if}
		</div>
		<a href="/resume_ayeh.pdf" download class="btn-download">Download PDF</a>
	</div>

	<p class="text-sm leading-relaxed text-[var(--text-2)]">
		Here is a small snippet of my professional experience. For complete details, please see the most recent PDF.
	</p>

	<!-- Timeline -->
	{#if timelineEntries.length}
		<div>
			<h2 class="mb-6 border-b border-[var(--surface-3)] pb-1 text-sm font-semibold uppercase tracking-widest text-[var(--text-2)]">
				History
			</h2>

			<!-- Column labels -->
			<div class="mb-4 flex text-xs font-semibold uppercase tracking-widest text-[var(--text-2)]">
				<div class="w-1/2 pr-8 text-right">Education</div>
				<div class="w-1/2 pl-8">Experience</div>
			</div>

			<div class="relative py-2">
				<!-- Spine -->
				<div class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--surface-3)]"></div>

				<div class="space-y-8">
					{#each timelineEntries as entry}
						<div class="relative flex items-start">
							{#if entry.kind === 'education'}
								<div class="w-1/2 pr-10 text-right">
									<p class="text-xs tabular-nums text-[var(--text-2)]">{entry.date}</p>
									<p class="font-semibold leading-snug">{entry.title}</p>
									<p class="text-sm text-[var(--text-2)]">{entry.subtitle}</p>
								</div>
								<div
									class="absolute left-1/2 top-[0.3rem] z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--text-2)] bg-[var(--surface-1)]"
								></div>
								<div class="w-1/2 pl-10"></div>
							{:else}
								<div class="w-1/2 pr-10"></div>
								<div
									class="absolute left-1/2 top-[0.3rem] z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--link)]"
								></div>
								<div class="w-1/2 pl-10">
									<p class="text-xs tabular-nums text-[var(--text-2)]">{entry.date}</p>
									<p class="font-semibold leading-snug">{entry.title}</p>
									<p class="text-sm text-[var(--text-2)]">{entry.subtitle}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Skills -->
	{#if skillsSection}
		<div>
			<h2 class="mb-3 border-b border-[var(--surface-3)] pb-1 text-sm font-semibold uppercase tracking-widest text-[var(--text-2)]">
				Skills
			</h2>
			<div class="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
				{#each skillsSection.items as item}
					<div class="flex gap-2">
						<span class="w-32 shrink-0 font-medium">{item.category}</span>
						<span class="text-[var(--text-2)]">{item.items}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- PDF viewer — commented out — using download button instead)
	<div>
		<h2 class="mb-3 border-b border-[var(--surface-3)] pb-1 text-sm font-semibold uppercase tracking-widest text-[var(--text-2)]">
			Full Resume
		</h2>
		<div class="rounded border border-[var(--surface-3)] shadow-sm">
			{#key viewerKey}
				<PdfViewer
					url="/resume_ayeh.pdf"
					scale={1.0}
					showButtons={['navigation', 'zoom', 'download', 'print']}
				/>
			{/key}
		</div>
	</div>
	-->
</section>

<style>
	.btn-download {
		background: var(--link);
		border-radius: var(--radius-2);
		color: white;
		font-size: var(--font-size-0);
		font-weight: 600;
		padding: var(--size-2) var(--size-5);
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.btn-download:hover {
		opacity: 0.8;
	}
</style>
