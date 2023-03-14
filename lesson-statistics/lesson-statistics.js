displayStatistics();

function displayStatistics() {
    const timelineContainer = document.querySelector('.lessons-list-timeline');
    const classesCount = document.querySelectorAll(
        '.lessons-timeline li'
    ).length;
    const completedClassesCount = document.querySelectorAll(
        '.lessons-timeline a'
    ).length;

    timelineContainer.insertAdjacentHTML(
        'afterbegin',
        `
        <div>
            <ul style='font-weight: bold; color: #004282; padding-left: 0; list-style: none;'>
                <li>&#9989; Пройдено уроків: ${completedClassesCount}</li>
                <li>&#8987; Залишилось уроків: ${
                    classesCount - completedClassesCount
                }</li>
                ${generateHomeworkStatus()}
            </ul>
        </div>
    `
    );
}

function generateHomeworkStatus() {
    const unfinishedHomeworksCount = document.querySelectorAll(
        '.lessons-timeline__item-link--danger'
    ).length;
    const uncheckedHomeworksCount = document.querySelectorAll(
        '.lessons-timeline__item-link--warning'
    ).length;

    if (uncheckedHomeworksCount && unfinishedHomeworksCount) {
        return `
            <li>&#128221; Домашок на перевірці: ${uncheckedHomeworksCount}</li>
            <li>&#10071; Залишилось здати домашок: ${unfinishedHomeworksCount}</li>
        `;
    }
    if (uncheckedHomeworksCount) {
        return `<li>&#128221; Всі домашки (${uncheckedHomeworksCount}) на перевірці</li>`;
    }
    if (unfinishedHomeworksCount) {
        return `<li>&#10071; Залишилось здати домашок: (${uncheckedHomeworksCount})</li>`;
    }
    if (!uncheckedHomeworksCount && !unfinishedHomeworksCount) {
        return `&#127881; Всі домашки виконані, так тримати!`;
    }
}
