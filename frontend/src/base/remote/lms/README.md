[戻る](../README.md)

# LMSInterface

複数のLMSからの情報を統一的に扱うために定義する。
LMSHandlerは`env.usginLMS`から適切な実装を自動で選択して`fetchAssignmentList`を提供する。

# mock

LMSInterfaceを実装したmock.
つまり、`fetchAssignmentList`が有効なダミーAssignmentの配列を返す。
