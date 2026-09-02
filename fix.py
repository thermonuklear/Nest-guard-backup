
import glob, re
for f in glob.glob('documents-*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = re.sub(r'<a class=\"nav-link\" href=\"safeguarding.html\">Safeguarding</a>\s*<a class=\"nav-link nav-link-sub', '<a class=\"nav-link nav-link-sub', content)
    content = re.sub(r'(<a class=\"nav-link nav-link-sub[^>]*>Finance</a>)\s*</div>', r'\1\n              <a class=\"nav-link\" href=\"safeguarding.html\">Safeguarding</a>\n            </div>', content)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

