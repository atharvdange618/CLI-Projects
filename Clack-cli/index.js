import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

async function main() {
    console.clear();
    await setTimeout(1000);

    p.intro(`${color.bgCyan(color.black(' Adventure Time! '))}`);

    const project = await p.group(
        {
            name: () =>
                p.text({
                    message: 'What is your name?',
                    placeholder: 'Atharv Dange',
                    validate: (value) => {
                        if (!value) return 'Please enter a name.';
                        if (value.length < 2) return 'Name should have at least 2 characters.';
                    },
                }),
            age: ({ results }) =>
                p.text({
                    message: `👋 Hi, ${results.name}! How old are you?`,
                    placeholder: '18',
                    validate: (value) => {
                        if (!value) return 'Please enter your age.';
                        if (isNaN(value)) return 'Please enter a valid number.';
                    },
                }),
            adventure: ({ results }) =>
                p.select({
                    message: `Hey, ${results.name}, choose your adventure!`,
                    initialValue: 'easy',
                    maxItems: 3,
                    options: [
                        { value: 'easy', label: '👶 Greenhorn Initiate' },
                        { value: 'medium', label: '👦 Seasoned Vanguard' },
                        { value: 'hard', label: '🥋 Master Sentinel', hint: "Oh no!" },
                    ],
                }),
            last_chance: ({ results }) =>
                results.adventure === 'hard' &&
                p.confirm({
                    message: `You're too ${results.age > 25 ? 'old' : 'young'} for the hard level. Are you sure?`,
                    initialValue: false,
                }),
        },
        {
            onCancel: () => {
                p.cancel("Don't be a quitter!");
                process.exit(0);
            },
        }
    );

    if (project.last_chance === false) {
        p.outro("Don't be a quitter!");
        process.exit(0);
    }

    if (project.adventure) {
        const s = p.spinner();
        s.start(`Initializing ${project.adventure} level!`);
        await setTimeout(2500);
        s.stop(`Time to start the ${project.adventure} level!`);
    }

    const nextSteps = `Get a walking stick, ${project.name}, and get your butt moving 🚨`;
    p.note(nextSteps, 'Next steps.');

    p.outro(`And so ends our epic journey through the realms of coding! Whether you chose the path of the Greenhorn Initiate, the Seasoned Vanguard, or dared to tread the perilous Master Sentinel's path (sorry, hard level rejectors!), you've braved it all.

        Now, dear adventurer ${project.name}, armed with your newfound wisdom and perhaps a slightly sore butt from all that sitting, remember: the real adventure awaits beyond these pixelated realms.Go forth with courage, wit, and a good debugger!

            For any lingering bugs or existential coding crises, don't hesitate to visit our magical support portal at ${color.underline(color.cyan('https://example.com/issues'))}. Farewell, and may your code forever compile on the first try!
        `);
}

main().catch(console.error);
