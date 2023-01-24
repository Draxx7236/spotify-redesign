# Sicherheit
Da die Applikation durch die Spotify API läuft, ist sie auch durch die API gesichert. Dir ganze Sicherung der App passiert in dem Login. Um das Programm oder überhaupt die ganze API zu benutzen braucht man einen Spotify Konto. Weiter braucht das Programm zwei generierte Tokens von Spotify selbst, die dazu dienen um sicherzustellen, dass die App sicher ist, indem man nur registrierte Benutzer durchlässt. 
In pages/api/auth/[...nextauth].js werden die Tokens geparsed und es werden zwei neue Tokens generiert für jeden Benutzer, Refresh-Token und Access-Token, diese dienen dazu den Benutzer zu registrieren und sicherzustellen, dass keine SQL-Injections oder andere Attacken stattfinden. Am Ende jeder Session wird der Benutzer ausgeloggt.