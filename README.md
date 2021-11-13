# Конечный результат (*для пользователя*)
## Стандартное обновление либы на последнюю актуальную
```bash
npx migrator
```
Тип либы (ангулар, раакт) и версия либы будут выбранны автоматически из package.json. По умолчанию обновляется до последней стабильной версии
## Миграция конкретной либы (либы задаются в ядре мигратора)
```bash
npx migratir --config <lib_name>
```
## Миграция на конкретную версию либы
```bash
npx migrator --move 4.0.0
```
Будет произведена миграция с текущей версии до версии 4.0.0.

Обратной миграции с версии 4 на версию 3 не предусмотренно
## Миграция с кастомным конфигом
```bash
npx migrator --config ./migrator-configs
```
В папке `./migrator-configs` находится файлы конфигураций `yaml` кастомные `селекторы` и `правила`


# Селектор
Селектор - место где применяется правило

типы селекторов:
* селектор файла .component.html, *, .ts
* селектор текста (конкретный тег button)

# Rule
rule - правило, по которому изменяется текст

типы rule:
* простые:
  * `CHANGE find_str TO replace_str`
  * `DELETE find_str`
  * `ADD added_str`
* с условием
  * `CHANGE [kind]="'primary'" TO [type]="'primary'" IF CONTAIN str`

## Условие
для каждого из типов rule можно добавить условие `IF expression`, `IF NOT expression`

```yaml
rules:
  - CHANGE [kind]="'primary'" TO [type]="'primary'" IF CONTAIN str
  - ADD [kind]="'secondary'" IF NOT CONTAIN [kind]="'primary'"
```
