[戻る](../README.md)

# TACT

TACTのAPIを叩いて，課題の一覧を取得する．
直接的なAPIのラッパーは`class TACTAPIWrapper`．
さらにこのwrapperを用いて，このプロダクトで扱いやすい形(AssignmentRecordStructの配列)で課題の一覧を返す責務を
`class TACTAPIExploiter`が担っている．
