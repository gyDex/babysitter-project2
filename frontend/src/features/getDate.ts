export function getDate(charts: boolean[]) {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const timeRanges = ['9:00–12:00', '12:00–15:00', '15:00–19:00', '19:00–22:00'];

  // Функция для объединения подряд идущих временных интервалов
  function mergeIntervals(intervals: string[]) {
    if (intervals.length === 0) return [];

    // Преобразуем строки в индексы по timeRanges
    const indexes = intervals
      .map(i => timeRanges.indexOf(i))
      .filter(i => i !== -1)
      .sort((a, b) => a - b);

    const merged: string[] = [];
    let start = indexes[0];
    let end = indexes[0];

    for (let i = 1; i < indexes.length; i++) {
      if (indexes[i] === end + 1) {
        // подряд идущий интервал
        end = indexes[i];
      } else {
        // закончить текущий интервал и начать новый
        merged.push(`${timeRanges[start].split('–')[0]}–${timeRanges[end].split('–')[1]}`);
        start = indexes[i];
        end = indexes[i];
      }
    }

    // Добавляем последний интервал
    merged.push(`${timeRanges[start].split('–')[0]}–${timeRanges[end].split('–')[1]}`);

    return merged;
  }

  const isWeekday = (day: string) => ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'].includes(day);

  const daySlots = Array.from({ length: 7 }, (_, dayIndex) => ({
    day: days[dayIndex],
    slots: charts.slice(dayIndex * 4, dayIndex * 4 + 4)
      .map((val, i) => val ? timeRanges[i] : null)
      .filter(Boolean) as string[]
  }));

  const grouped: Record<string, Set<string>> = {
    Будни: new Set(),
    Выходные: new Set(),
  };

  daySlots.forEach(({ day, slots }) => {
    if (slots.length === 0) return;
    const group = isWeekday(day) ? 'Будни' : 'Выходные';
    slots.forEach(slot => grouped[group].add(slot));
  });

  const parts: string[] = [];

  for (const key in grouped) {
    const uniqueSlots = Array.from(grouped[key]);
    const mergedSlots = mergeIntervals(uniqueSlots);
    if (mergedSlots.length > 0) {
      parts.push(`${key}: ${mergedSlots.join(', ')}`);
    }
  }

  return parts.join('\n'); // через перенос строки, чтобы максимум две строки
}
